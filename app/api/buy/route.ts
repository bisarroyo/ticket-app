import { db } from "@/lib/db";
import { sectionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// Simulación de almacenamiento temporal en memoria (usar Redis en producción)
import { locks } from "./lock";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lockId } = body;
    if (!lockId || !locks[lockId]) {
      return new Response(
        JSON.stringify({ error: "Reserva no encontrada o expirada" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const lock = locks[lockId];
    // Validar que no haya expirado
    if (Date.now() > lock.expires) {
      delete locks[lockId];
      return new Response(
        JSON.stringify({ error: "El tiempo de reserva expiró" }),
        {
          status: 410,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Remover los cupos de las secciones
    for (const section of lock.sections) {
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
      // Actualizar la capacidad
      const newCapacity = dbSection.capacity - section.qty;
      if (newCapacity < 0) {
        return new Response(
          JSON.stringify({
            error: `No hay suficientes cupos en la sección ${dbSection.name}`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      await db
        .update(sectionsTable)
        .set({ capacity: newCapacity })
        .where(eq(sectionsTable.id, Number(section.id)));
    }

    // Eliminar el lock
    delete locks[lockId];

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Error al procesar la compra" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
