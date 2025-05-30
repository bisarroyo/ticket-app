import InsertEventsTable from '@/db/schema'
import SelectEventsTable from '@/db/schema'

declare global {
  // events
  type InsertEvent = typeof InsertEventsTable
  type SelectEvent = typeof SelectEventsTable
}
