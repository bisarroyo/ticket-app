'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
// import VenueMap from '@/components/buy/venue-map'
import InputTicket from './input-ticket'
import Button from '../ui/button'

type SelectedSeat = { id: string; qty: number }

const BuyTickets: React.FC<{ event: BuyEvent }> = ({ event }) => {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSeatAdd = (id: string) => {
    const newState = selectedSeats.map((section) => {
      if (section.id === id) {
        return { ...section, qty: section.qty + 1 }
      }
      return section
    })
    setSelectedSeats(newState)
  }
  const handleSeatRemove = (id: string) => {
    const newState = selectedSeats.map((section) => {
      if (section.id === id) {
        if (section.qty === 0) return section
        return { ...section, qty: section.qty - 1 }
      }
      return section
    })
    setSelectedSeats(newState)
  }

  const validateSections = async () => {
    const payload = {
      event_id: event.id,
      sections: selectedSeats
        .filter((section) => section.qty > 0)
        .map((section) => ({
          id: section.id,
          qyt: section.qty
        })),
      error: null
    }
    try {
      const res = await fetch('/api/buy/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
      } else {
        console.log(data)
        // Redirigir o avanzar
      }
    } catch (error) {
      console.log(error)
      setError('Error al procesar la compra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const { sections } = event.venue_id

    const state = sections?.map((section) => {
      return { id: section.id, qty: 0 }
    })
    setSelectedSeats(state)
  }, [event])

  return (
    <div>
      <h1>Buy Tickets</h1>
      <div>
        <Table>
          <TableCaption>Lista de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Ubicación</TableHead>
              <TableHead className='text-right'>Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event.venue_id.sections?.map((sections) => {
              const selected = selectedSeats.find(
                (seat) => seat.id === sections.id
              )
              return (
                <TableRow key={sections.id}>
                  <TableCell className='font-medium'>
                    {sections?.name}
                  </TableCell>
                  <TableCell className='text-right'>
                    {sections?.price}
                  </TableCell>
                  <TableCell className='text-right'>
                    <InputTicket
                      handleClickRemoveTicket={() =>
                        handleSeatRemove(sections.id)
                      }
                      handleClickAddTicket={() => handleSeatAdd(sections.id)}
                      value={selected?.qty ?? 0}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Button
          className='mt-4'
          variant='default'
          type='submit'
          text='Continuar'
          onClick={validateSections}
          disabled={loading}
        />
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      {/* <div className='h-[400px] w-full'>
        <VenueMap eventId={event.id} onSeatSelect={handleSeat} />
      {/* <VenueMap eventId={id} onSeatSelect={handleSeat} /> */}
    </div>
  )
}

export default BuyTickets
