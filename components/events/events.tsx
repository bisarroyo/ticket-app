'use client'
import { format } from '@formkit/tempo'

import CardEvent from '@/components/events/card-event'
import Loading from '@/components/ui/loading'

// state
import { useEventStore } from '@/app/store/events'
import { useEffect } from 'react'

export default function Events() {
  const { events, loading, error, fetchEvents } = useEventStore()

  useEffect(() => {
    if (events.length === 0) {
      console.log('Fetching events...')
      fetchEvents()
    }
  }, [events, fetchEvents])

  // console.log('Events:', events)
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
          {events?.map((event: SelectEvent) => (
            <CardEvent
              key={event.id}
              location={event.venueId?.name}
              name={event.name}
              url={`/event/${event.id}`}
              date={format(event.date, { date: 'long' }, 'es')}
              time={format(event.date, { time: 'short' })}
              image={event.eventImage}
            />
          ))}
        </div>
      </main>
    </>
  )
}
