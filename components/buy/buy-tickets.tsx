"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useReducer, useEffect, useState } from "react";
import InputTicket from "./input-ticket";
import Button from "../ui/button";

type SelectedSeat = { id: number; qty: number; max: number };

type Action =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "reset"; seats: SelectedSeat[] };

function seatsReducer(state: SelectedSeat[], action: Action): SelectedSeat[] {
  const MAX_TOTAL = 10;
  switch (action.type) {
    case "add": {
      const totalQty = state.reduce((sum, s) => sum + s.qty, 0);
      return state.map((section) => {
        if (
          section.id === Number(action.id) &&
          section.qty < section.max &&
          totalQty < MAX_TOTAL
        ) {
          return { ...section, qty: section.qty + 1 };
        }
        return section;
      });
    }
    case "remove":
      return state.map((section) =>
        section.id === Number(action.id) && section.qty > 0
          ? { ...section, qty: section.qty - 1 }
          : section
      );
    case "reset":
      return action.seats;
    default:
      return state;
  }
}

const BuyTickets: React.FC<{
  event: SelectEvent;
  maxTicketsPerSection?: number;
}> = ({ event, maxTicketsPerSection = 10 }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa los asientos seleccionados con useReducer
  const [selectedSeats, dispatch] = useReducer(
    seatsReducer,
    event.sections?.map((section: SelectSection) => ({
      id: section.id,
      qty: 0,
      max: Math.min(section.capacity, maxTicketsPerSection),
    })) ?? []
  );

  // Calcula el total de tickets seleccionados
  const totalQty = selectedSeats.reduce((sum, s) => sum + s.qty, 0);

  // Si el evento cambia, resetea los asientos
  useEffect(() => {
    dispatch({
      type: "reset",
      seats:
        event.sections?.map((section: SelectSection) => ({
          id: section.id,
          qty: 0,
          max: Math.min(section.capacity, maxTicketsPerSection),
        })) ?? [],
    });
  }, [event, maxTicketsPerSection]);

  const validateSections = async () => {
    setLoading(true);
    const payload = {
      event_id: event.events.id,
      sections: selectedSeats
        .filter((section) => section.qty > 0)
        .map((section) => ({
          id: section.id,
          qty: section.qty,
        })),
    };
    try {
      // Crear el lock en el server
      const lockRes = await fetch("/api/buy/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const lockData = await lockRes.json();
      if (!lockRes.ok || !lockData.lockId) {
        setError(lockData.error || "No se pudo reservar los cupos");
        setLoading(false);
        return;
      }
      setError(null);
      // Redirigir al usuario a la página de pago con lockId y eventId
      window.location.assign(
        `/payment?event=${payload.event_id}&lockId=${lockData.lockId}`
      );
    } catch {
      setError("Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Comprar Tickets</h1>
      <Table>
        <TableCaption>Lista de precios.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ubicación</TableHead>
            <TableHead className="">Precio</TableHead>
            <TableHead className="">Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {event.sections?.map((section: SelectSection) => {
            const selected = selectedSeats.find(
              (seat) => seat.id === section.id
            );
            const canAdd =
              selected && selected.qty < selected.max && totalQty < 10;
            return (
              <TableRow key={section.id}>
                <TableCell>{section.name}</TableCell>
                <TableCell className="">{section.price}</TableCell>
                <TableCell className="mx-2">
                  <InputTicket
                    handleClickRemoveTicket={() =>
                      dispatch({ type: "remove", id: section.id })
                    }
                    handleClickAddTicket={
                      canAdd
                        ? () => dispatch({ type: "add", id: section.id })
                        : () => {}
                    }
                    value={selected?.qty ?? 0}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-2 text-right font-bold">
        Total tickets: {totalQty} / 10
      </div>
      <Button
        className="mt-4"
        variant="default"
        type="submit"
        text="Continuar"
        onClick={validateSections}
        disabled={loading || totalQty === 0}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BuyTickets;
