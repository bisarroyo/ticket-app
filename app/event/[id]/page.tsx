'use client'

import SingleEvent from '@/components/events/single-event'
import Loading from '@/components/ui/loading'
import NotFound from '@/components/ui/not-found'
import { use, useEffect, useState } from 'react'

// state
import { useEventStore } from '@/app/store/events'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = use(params)

  const { loading, error, getById, fetchById } = useEventStore()

  const eventId = getById(paramId)
  const [event, setEvent] = useState<(SelectEvent & SelectVenue) | undefined>()

  useEffect(() => {
    if (eventId) {
      setEvent(eventId)
      console.log('EventId:', eventId)
    } else {
      fetchById(paramId).then((e) => {
        if (e) setEvent(e)
      })
    }
  }, [paramId, eventId, fetchById])

  // console.log('id:', id)

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <Loading />
      </div>
    )
  }

  if (!paramId || !event || error) {
    return (
      <div className='container'>
        <NotFound />
      </div>
    )
  }

  const {
    events: {
      id,
      name,
      eventImage,
      startsAt,
      venueId,
      description,
      aditionalInfo,
      prices
    }
  } = event

  return (
    <section className='my-5'>
      <SingleEvent
        id={id}
        name={name}
        url={eventImage}
        date={startsAt}
        venueId={venueId?.name ?? 'test'}
        description={description}
        aditional_info={aditionalInfo}
        prices={prices}
      />
    </section>
  )
}
