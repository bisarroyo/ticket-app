import {
  InsertEventsTable,
  SelectEventsTable,
  InsertVenuesTable,
  SelectVenuesTable,
  InsertSectionsTable,
  SelectSectionsTable
} from '@/db/schema'

declare global {
  // events
  type InsertEvent = typeof InsertEventsTable
  type SelectEvent = typeof SelectEventsTable

  //venues
  type InsertVenue = typeof InsertVenuesTable
  type SelectVenue = typeof SelectVenuesTable

  //sections
  type InsertSection = typeof InsertSectionsTable
  type SelectSection = typeof SelectSectionsTable

  interface TicketSoldWithVenueType extends Omit<SelectEvent, 'venueId'> {
    venueId: SelectVenue
  }

  // event with venue and sections
  interface EventWithVenueAndSections {
    events: SelectEvent
    venues: SelectVenue
    sections: SelectSection[]
  }
}
