// 'use client'
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
//   getKeyValue
// } from '@nextui-org/react'

// import { useCallback } from 'react'
// import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react'

// const columns = [
//   { name: 'EVENTO', uid: 'name' },
//   { name: 'PRECIO', uid: 'price' },
//   { name: 'ESTADO', uid: 'status' },
//   { name: 'ACCIONES', uid: 'actions' }
// ]

// const events = [
//   {
//     id: 2,
//     name: 'Event name',
//     price: 100,
//     paymentStatus: 'Pagado',
//     status: 'activo'
//   },
//   {
//     id: 2,
//     name: 'Event name',
//     price: 100,
//     paymentStatus: 'Pendiente',
//     status: 'activo'
//   }
// ]

// type Status = {
//   activo: string
//   cancelado: string
//   terminado: string
// }
// const statusColorMap: Status = {
//   activo: 'success',
//   cancelado: 'danger',
//   terminado: 'warning'
// }

// type Event = {
//   id: number
//   name: string
//   price: number
//   paymentStatus: string
//   status: string
// }
// type columnKey = keyof Event

// export default function HistoryTable() {
//   const renderCell = useCallback((event: Event, columnKey: columnKey) => {
//     const cellValue = event[columnKey]

//     switch (columnKey) {
//       case 'name':
//         return <p>{event.name}</p>
//       case 'price':
//         return (
//           <div className='flex flex-col'>
//             <p className='text-bold text-sm capitalize'>{cellValue}</p>
//             <p className='text-bold text-sm capitalize text-default-400'>
//               {event.paymentStatus}
//             </p>
//           </div>
//         )
//       case 'status':
//         return (
//           <Chip
//             className='capitalize'
//             color={statusColorMap[event.status]}
//             size='sm'
//             variant='flat'
//           >
//             {cellValue}
//           </Chip>
//         )
//       case 'actions':
//         return (
//           <div className='relative flex items-center justify-center gap-2'>
//             <Tooltip content='Detalles'>
//               <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
//                 <IconEye />
//               </span>
//             </Tooltip>
//             <Tooltip content='Edit user'>
//               <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
//                 <IconEdit />
//               </span>
//             </Tooltip>
//             <Tooltip color='danger' content='Delete user'>
//               <span className='text-lg text-danger cursor-pointer active:opacity-50'>
//                 <IconTrash />
//               </span>
//             </Tooltip>
//           </div>
//         )
//       default:
//         return cellValue
//     }
//   }, [])

//   return (
//     <Table aria-label='Example table with custom cells' className='my-5'>
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             align={column.uid === 'actions' ? 'center' : 'start'}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={events}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => (
//               <TableCell>{renderCell(item, columnKey)}</TableCell>
//             )}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   )
// }
