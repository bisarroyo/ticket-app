import { db } from '@/lib/db'
import { eventsTable } from '@/db/schema'

export async function GET() {
  try {
    const response = await db
      .select()
      .from(eventsTable)
      .orderBy(eventsTable.date)

    if (!response) {
      throw new Error('Failed to fetch events')
    }

    const data: SelectEvent[] = await response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error loading events:', error)
    return new Response(JSON.stringify({ error: 'Error al cargar eventos' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
