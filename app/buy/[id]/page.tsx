'use client'
// import BuyTickets from '@/components/buy/buy-tickets'

import { use, useEffect, useState } from 'react'

import Loading from '@/components/ui/loading'

// state
import { useEventStore } from '@/app/store/events'

import NotFound from '@/app/not-found'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = use(params)

  const { loading, error, getById, fetchById } = useEventStore()

  const eventId = getById(paramId)

  useEffect(() => {
    if (eventId) {
      setEvent(eventId.sections)
    } else {
      fetchById(paramId).then((e) => {
        if (e) setEvent(e)
      })
    }
  }, [paramId, eventId, fetchById])

  const [event, setEvent] = useState<(SelectEvent & SelectVenue) | undefined>()

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
  // if (!event?.display_map) {
  //   return <BuyTickets event={event} />
  // }
  return <section className='container'>{event?.id}</section>
}
