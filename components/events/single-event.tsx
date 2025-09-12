import EventHero from "./event-hero";
import EventDetails from "./event-details";
import EventDescription from "./event-description";
import EventLocation from "./event-location";
import EventAditionalInfo from "./event-aditional-info";

import Link from "next/link";
import EventPrices from "./event-prices";
import { ArrowUpRight } from "lucide-react";

export default function SingleEvent({
  sections,
  events,
  venues,
}: EventWithVenueAndSections) {
  const { id, name, eventImage, startsAt, description, aditionalInfo } = events;

  const availability = sections.some(section => section.capacity >= 1);

  return (
    <div className="container">
      <div className="max-w-4xl grid grid-cols-1  gap-x-8 gap-y-12 mx-auto">
        <EventHero img={eventImage} isAvailable={availability} />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 lg:gap-8">
          <div className="w-full flex flex-col justify-center md:justify-start md:items-start items-center">
            <EventDetails date={startsAt} venue={venues} isAvailable={availability} />
            <Link
              href={`/buy/${id}`}
              className="bg-primary text-primary-foreground border-primary shadow-xl hover:bg-primary/80 text-md py-2 px-4 text-center rounded-md w-full focus:outline-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Adquirir entradas
            </Link>
            <div className="w-full border-t border-white/30 mt-5 pt-5 ">
              <p>Organizado por:</p>

              {/* todo: insert correct user */}
              <Link
                href={`/profile/${"pluscreative"}`}
                className="flex items-center gap-1 text-slate-700"
              >
                Plus creative <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid gap-8 w-full">
            <EventDescription title={name} description={description} />
            <EventPrices sections={sections} />
            <EventAditionalInfo details={aditionalInfo} />
            <EventLocation />
          </div>
        </div>
      </div>
    </div>
  );
}
