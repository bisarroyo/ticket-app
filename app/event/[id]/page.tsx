'use client'

import SingleEvent from '@/components/events/single-event'
import Loading from '@/components/ui/loading'
import NotFound from '@/components/ui/not-found'
import { use, useEffect, useState } from 'react'

// state
import { useEventStore } from '@/app/store/events'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const { loading, error, getById, fetchById } = useEventStore()
  const [event, setEvent] = useState<SelectEvent | undefined>()

  useEffect(() => {
    const existing = getById(id)
    if (existing) {
      setEvent(existing)
    } else {
      fetchById(id).then((e) => {
        if (e) setEvent(e)
      })
    }
  }, [id, getById, fetchById])

  console.log('Event:', event)

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Loading />
      </div>
    )
  }

  if (!id || !event || error) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  return (
    <section className='my-5'>
      <SingleEvent
        events={event}
        id={event.id}
        name={event.name}
        url={event.eventImage}
        date={event.startsAt}
        location={event.venueId?.name ?? 'test'}
        description={event.description}
        aditional_info={event.aditionalInfo}
        prices={event.prices}
      />
    </section>
  )
}
