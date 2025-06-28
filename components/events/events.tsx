'use client'
import { format } from '@formkit/tempo'

import CardEvent from '@/components/events/card-event'
import Loading from '@/components/ui/loading'

// state
import { useEventStore } from '@/app/store/events'
import { useEffect } from 'react'

export default function Events() {
  const { events, getEvents, loading, error, fetchEvents } = useEventStore()

  useEffect(() => {
    const events = getEvents()
    if (events.length <= 1) {
      console.log(events.length, 'No events found, fetching...')
      fetchEvents()
    }
  }, [getEvents, fetchEvents])

  console.log('Events:', events)
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    )
  }
  if (error) {
    return <div>error</div>
  }
  if (!events || events.length === 0) {
    return <div className='text-center'>No hay eventos disponibles</div>
  }

  return (
    <>
      <main>
        <div className=' py-5 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle'>
          {events?.map((event: SelectEvent) => {
            const { events } = event
            return (
              <CardEvent
                key={events.id}
                location={event?.venues?.name}
                name={events.name}
                url={`/event/${events.id}`}
                date={format(events.date, { date: 'long' }, 'es')}
                time={format(events.date, { time: 'short' })}
                image={events.eventImage}
              />
            )
          })}
        </div>
      </main>
    </>
  )
}
