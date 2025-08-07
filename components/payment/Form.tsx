import { useState } from "react";
import Button from "../ui/button";

type FormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
};

const Form = ({ handleSubmit, loading, error }: FormProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    exp: "",
    cvc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Nombre completo
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Juan Pérez"
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
          placeholder="ejemplo@correo.com"
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
          placeholder="1234 5678 9012 3456"
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
            placeholder="123"
            value={form.cvc}
            onChange={handleChange}
            required
            maxLength={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 text-white font-bold py-2 rounded hover:bg-amber-600 transition-colors"
        text={loading ? "Procesando..." : "Pagar"}
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
    </form>
  );
};

export default Form;
