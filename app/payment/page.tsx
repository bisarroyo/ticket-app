"use client";

import { useState, useEffect } from "react";
type SectionDetail = { name: string; qty: number; price: number };
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");
  const lockId = searchParams.get("lockId");
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    exp: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [details, setDetails] = useState<SectionDetail[]>([]);
  const [expires, setExpires] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Pago de Tickets</h2>
      {success ? (
        <div className="text-green-600 font-semibold text-center">
          ¡Pago realizado con éxito!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="card">
              Número de tarjeta
            </label>
            <input
              type="text"
              name="card"
              id="card"
              value={form.card}
              onChange={handleChange}
              required
              maxLength={16}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1" htmlFor="exp">
                Expiración
              </label>
              <input
                type="text"
                name="exp"
                id="exp"
                value={form.exp}
                onChange={handleChange}
                required
                placeholder="MM/AA"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1" htmlFor="cvc">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                value={form.cvc}
                onChange={handleChange}
                required
                maxLength={4}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-600 transition-colors"
          >
            {loading ? "Procesando..." : "Realizar pago"}
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
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
            Cupos reservados hasta: {new Date(expires).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
