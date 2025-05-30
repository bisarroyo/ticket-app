import { db } from '@/lib/db'
import { eventsTable } from '@/db/schema'
import { sql } from 'drizzle-orm'

import { type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log(id)

  if (!id) {
    return new Response(JSON.stringify({ error: 'Event ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const response = db
      .select()
      .from(eventsTable)
      .where(sql`${eventsTable.id} = ${id}`)
      .limit(1)

    if (!response) {
      throw new Error('Failed to fetch event')
    }

    return response.then((data) => {
      if (data.length === 0) {
        return new Response(JSON.stringify({ error: 'Event not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      return new Response(JSON.stringify(data[0]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  } catch (error) {
    console.error('Error loading event:', error)
    return new Response(
      JSON.stringify({ error: 'Error al cargar el evento' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
