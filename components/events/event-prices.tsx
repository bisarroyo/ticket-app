import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  sections: SelectSection[];
};

export default function EventPrices({ sections }: Props) {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-4">Precios</h3>
      <div className="border border-white/30 p-2 md:p-4 rounded-lg ">
        <Table>
          <TableCaption>Lista de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ubicación</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections?.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell className="text-right">$ {event.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
