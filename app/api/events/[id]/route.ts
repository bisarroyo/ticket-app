import { db } from "@/lib/db";
import { eventsTable, sectionsTable, venuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Event ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const rows = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, Number(id)))
      .leftJoin(venuesTable, eq(venuesTable.eventId, eventsTable.id))
      .leftJoin(sectionsTable, eq(venuesTable.id, sectionsTable.venueId))
      .all();

    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(rows);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error loading event:", error);
    return new Response(
      JSON.stringify({ error: "Error al cargar el evento" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
