import { CircleMinus, CirclePlus } from "lucide-react";

interface ButtonProps {
  handleClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

function Button({ handleClick, ariaLabel, children }: ButtonProps) {
  return (
    <button
      className="w-8 h-8 text-lg font-bold   transition-colors duration-150 focus:outline-none cursor-pointer"
      aria-label={ariaLabel}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}

function InputTicket({
  handleClickRemoveTicket,
  handleClickAddTicket,
  value,
}: {
  handleClickRemoveTicket: () => void;
  handleClickAddTicket: () => void;
  value: number;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 min-w-32 backdrop-blur-2xl bg-white/30 rounded-lg px-3 py-2 shadow-md">
      <Button handleClick={handleClickRemoveTicket} ariaLabel="Quitar ticket">
        <CircleMinus />
      </Button>
      <span className="text-xl font-semibold select-none px-2 w-10 text-center">
        {value}
      </span>
      <Button handleClick={handleClickAddTicket} ariaLabel="Agregar ticket">
        <CirclePlus />
      </Button>
    </div>
  );
}

export default InputTicket;
