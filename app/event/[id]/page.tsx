"use client";

import SingleEvent from "@/components/events/single-event";
import Loading from "@/components/ui/loading";
import NotFound from "@/components/ui/not-found";
import { use, useEffect } from "react";

// state
import { useEventStore } from "@/app/store/events";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = use(params);

  const { loading, error, fetchById, selectedEvent, clearSelectedEvent } =
    useEventStore();

  useEffect(() => {
    fetchById(paramId);
    return () => {
      clearSelectedEvent();
    };
  }, [paramId, fetchById, clearSelectedEvent]);

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
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    );
  }
  console.log(selectedEvent);

  const { events, venues, sections } = selectedEvent;

  return (
    <section className="my-5">
      <SingleEvent sections={sections} events={events} venues={venues} />
    </section>
  );
}
