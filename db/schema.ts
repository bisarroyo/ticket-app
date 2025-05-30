import { sql } from 'drizzle-orm'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const fooTable = sqliteTable('foo', {
  userId: text('bar').notNull().default('Hey!'),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
})

export type InsertFooTable = typeof fooTable.$inferInsert
