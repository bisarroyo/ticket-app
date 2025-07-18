import { db } from "@/lib/db";
import { eventsTable, venuesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const response = await db
      .select({
        events: {
          id: eventsTable.id,
          name: eventsTable.name,
          date: eventsTable.date,
          eventImage: eventsTable.eventImage,
        },
        venues: {
          id: venuesTable.id,
          name: venuesTable.name,
        },
      })
      .from(eventsTable)
      .orderBy(eventsTable.date)
      .leftJoin(venuesTable, eq(venuesTable.eventId, eventsTable.id));

    if (!response) {
      console.log(response);
      throw new Error("Failed to fetch events");
    }
    console.log("Response:", response);

    const data: SelectEvent[] = await response;
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error loading events:", error);
    return new Response(JSON.stringify({ error: "Error al cargar eventos" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
