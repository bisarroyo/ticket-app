import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type Props = {
  prices: {
    location: string
    price: number
  }[]
}

export default function EventPrices({ prices }: Props) {
  return (
    <div className='w-full'>
      <h3 className='text-2xl font-semibold mb-4'>Precios</h3>
      <div className='border border-white/30 p-2 md:p-4 rounded-lg '>
        <Table>
          <TableCaption>Lista de precios.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Ubicación</TableHead>
              <TableHead className='text-right'>Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices?.map((event, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{event.location}</TableCell>
                <TableCell className='text-right'>$ {event.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
