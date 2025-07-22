import { db } from "@/lib/db";
import { sectionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

// Simulación de almacenamiento temporal en memoria (usar Redis en producción)
type SectionLock = { id: number; qty: number };
type SectionDetail = { name: string; qty: number; price: number };
const locks: Record<
  string,
  {
    expires: number;
    sections: SectionLock[];
    total: number;
    details: SectionDetail[];
  }
> = {};

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

    let total = 0;
    const details = [];
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
      total += dbSection.price * section.qty;
      details.push({
        name: dbSection.name,
        qty: section.qty,
        price: dbSection.price,
      });
    }

    // Generar un lockId único
    const lockId = Math.random().toString(36).substring(2);
    locks[lockId] = {
      expires: Date.now() + 10 * 60 * 1000,
      sections,
      total,
      details,
    };

    return new Response(
      JSON.stringify({
        lockId,
        total,
        details,
        expires: locks[lockId].expires,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Error al bloquear los cupos" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lockId = searchParams.get("lockId");
  if (!lockId || !locks[lockId]) {
    return new Response(JSON.stringify({ error: "Lock no encontrado" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const lock = locks[lockId];
  // Si expiró, eliminar y avisar
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
  return new Response(JSON.stringify(lock), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
