import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const eventsTable = sqliteTable('events', {
  eventId: integer({ mode: 'number' })
    .notNull()
    .primaryKey({ autoIncrement: true }),

  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  date: integer({ mode: 'timestamp' }).notNull(),

  name: text('name').notNull(),

  description: text('description'),

  status: text('status').notNull(),

  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),

  startsAt: integer('starts_at', { mode: 'timestamp' }).notNull(),

  endsAt: integer('ends_at', { mode: 'timestamp' }).notNull(),

  url: text('url'),

  isOnline: integer('is_online', { mode: 'boolean' }).notNull().default(false),

  capacity: integer('capacity').notNull().default(0),

  eventImage: text('event_image').notNull(),

  // jsonb[] NO existe en LibSQL. Usa un array serializado o una tabla relacionada.
  aditionalInfo: text({ mode: 'json' }).$type<{ detail: string }>(),

  prices: text({ mode: 'json' }).$type<{ detail: string }>(),

  venueId: text('venue_id').notNull(), // uuid → text

  duration: integer('duration'),

  userId: text('user_id'),

  map: integer('map', { mode: 'boolean' }).notNull().default(false),
  displayMap: integer('display_map', { mode: 'boolean' })
    .notNull()
    .default(false)
})

export type InsertEventsTable = typeof eventsTable.$inferInsert
export type SelectEventsTable = typeof eventsTable.$inferSelect
