import {
  InsertEventsTable,
  SelectEventsTable,
  InsertVenuesTable,
  SelectVenuesTable
} from '@/db/schema'

declare global {
  // events
  type InsertEvent = typeof InsertEventsTable
  type SelectEvent = typeof SelectEventsTable

  //venues
  type InsertVenue = typeof InsertVenuesTable
  type SelectVenue = typeof SelectVenuesTable

  interface TicketSoldWithVenueType extends Omit<SelectEvent, 'venueId'> {
    venueId: SelectVenue
  }
}
