"use client";

import { useState, useEffect } from "react";
type SectionDetail = { name: string; qty: number; price: number };
import { useSearchParams } from "next/navigation";
import Loading from "@/components/ui/loading";
import { formatTime } from "@/lib/utils";
import Form from "@/components/payment/Form";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");
  const lockId = searchParams.get("lockId");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [details, setDetails] = useState<SectionDetail[]>([]);
  const [expires, setExpires] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(600);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Aquí iría la lógica real de pago
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  useEffect(() => {
    async function fetchLock() {
      if (!lockId) return;
      const res = await fetch(`/api/buy/lock?lockId=${lockId}`);
      const data = await res.json();

      if (res.ok) {
        setTotal(data.total);
        setDetails(data.details);
        setExpires(data.expires);
      } else {
        setError(data.error || "No se pudo obtener el monto");
      }
    }
    fetchLock();
  }, [lockId]);

  useEffect(() => {
    if (!expires) return;
    const interval = setInterval(() => {
      const seconds = Math.max(0, Math.floor((expires - Date.now()) / 1000));
      setTimer(seconds);
      if (seconds === 0) {
        setError("El tiempo de reserva expiró");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expires]);
  // Formatea el tiempo restante en mm:ss

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="text-red-500 text-center">{error}</div>
        <div className="text-center mt-4">
          <a href={`/buy/${eventId}`} className="text-blue-500 underline">
            Volver a comprar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Pago de Tickets</h2>
      {success ? (
        <div className="text-green-600 font-semibold text-center">
          ¡Pago realizado con éxito!
        </div>
      ) : (
        <Form handleSubmit={handleSubmit} loading={loading} error={error} />
      )}
      <div className="mt-6 p-4 bg-amber-50 rounded text-amber-900">
        <div className="font-semibold">Resumen de compra</div>
        <div>
          Evento: <span className="font-mono">{eventId}</span>
        </div>
        {details.length > 0 && (
          <div className="mt-2">
            <div className="font-medium mb-1">Tickets seleccionados:</div>
            <ul className="text-sm">
              {details.map((d, i) => (
                <li key={i}>
                  {d.qty} x {d.name}{" "}
                  <span className="float-right">${d.price * d.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-2 font-bold text-lg">
          Total a pagar: {total !== null ? `$${total}` : "-"}
        </div>
        {expires && (
          <div className="text-xs mt-1 text-amber-700">
            Tiempo restante de compra: {formatTime(timer)}
          </div>
        )}
      </div>
    </div>
  );
}
