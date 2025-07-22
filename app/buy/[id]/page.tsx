"use client";
// import BuyTickets from '@/components/buy/buy-tickets'

import { use, useEffect } from "react";

import Loading from "@/components/ui/loading";

// state
import { useEventStore } from "@/app/store/events";

import NotFound from "@/app/not-found";
import BuyTickets from "@/components/buy/buy-tickets";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = use(params);

  const {
    loading,
    error,
    getById,
    fetchById,
    clearSelectedEvent,
    setSelectedEvent,
    selectedEvent,
  } = useEventStore();

  const found = getById(paramId);

  useEffect(() => {
    if (found) {
      setSelectedEvent(found);
    } else {
      fetchById(paramId);
      return () => clearSelectedEvent();
    }
  }, [
    paramId,
    getById,
    fetchById,
    clearSelectedEvent,
    setSelectedEvent,
    found,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!paramId || !selectedEvent || error) {
    return (
      <div className="container">
        <NotFound />
      </div>
    );
  }
  if (!selectedEvent?.events.display_map) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <BuyTickets event={selectedEvent} />
      </div>
    );
  }
  // return <section className="container">{selectedEvent?.events.id}</section>;
}
