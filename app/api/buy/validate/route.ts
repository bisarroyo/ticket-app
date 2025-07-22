import { db } from "@/lib/db";
import { eventsTable, sectionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_id, sections } = body;
    if (!event_id || !sections || !Array.isArray(sections)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Validating sections:", { event_id, sections });

    // Validar que el evento existe
    const event = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, Number(event_id)))
      .get();
    if (!event) {
      return new Response(JSON.stringify({ error: "Evento no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validar disponibilidad de tickets por sección
    for (const section of sections) {
      const dbSection = await db
        .select()
        .from(sectionsTable)
        .where(eq(sectionsTable.id, Number(section.id)))
        .get();
      if (!dbSection) {
        return new Response(
          JSON.stringify({ error: `Sección ${section.id} no encontrada` }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      if (section.qty > dbSection.capacity) {
        return new Response(
          JSON.stringify({
            error: `No hay suficientes tickets disponibles en la sección ${dbSection.name}`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Si todo está bien, devolver éxito y la URL de pago
    // Aquí podrías crear una orden temporal y devolver la URL de pago
    // Por ahora, solo devolvemos una URL dummy
    return new Response(
      JSON.stringify({
        success: true,
        redirectUrl: `/payment?event=${event_id}`,
        sections: sections.map((section) => ({
          id: section.id,
          qty: section.qty,
        })),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error validando tickets:", error);
    return new Response(
      JSON.stringify({ error: "Error al validar los tickets" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
