'use client'
import { format } from '@formkit/tempo'

import CardEvent from '@/components/events/card-event'
import Loading from '@/components/ui/loading'

// state
import { useEventStore } from '@/app/store/events'
import { useEffect } from 'react'

export default function Events() {
  const { events, loading, error, getEvents } = useEventStore((state) => state)

  useEffect(() => {
    if (events.length === 0) {
      getEvents()
    }
  }, [events, getEvents])

  console.log('Events:', events)
  if (error) {
    return <div>error</div>
  }
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    )
  }
  if (!events || events.length === 0) {
    return <div className='text-center'>No hay eventos disponibles</div>
  }
  const date = new Date(events[0].date)
  console.log('First event date:', date)

  return (
    <>
      <main>
        <div className=' py-5 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center align-middle'>
          {events?.map((event: SelectEvent) => (
            <CardEvent
              key={event.id}
              location={event.venue_id?.name}
              name={event.name}
              url={`/event/${event.id}`}
              date={format(event.date, { date: 'long' }, 'es')}
              time={format(event.date, { time: 'short' })}
              image={event.event_image}
            />
          ))}
        </div>
      </main>
    </>
  )
}
