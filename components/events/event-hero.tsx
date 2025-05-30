'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
export default function EventHero({
  img,
  isAvailable
}: {
  img: string
  isAvailable: boolean
}) {
  return (
    <div className='w-full relative'>
      <Image
        src={img}
        priority={true}
        alt='Imagen del evento'
        height='494'
        width='1152'
        className='w-full object-cover aspect-16/7 rounded-2xl transition-opacity duration-500'
      />
      <p
        className={cn(
          'text-md px-4 py-2 w-fit bg-white/70 backdrop-blur-md border border-white/20 rounded-full shadow-lg absolute bottom-4 left-4',
          isAvailable ? 'text-available' : 'text-danger'
        )}
      >
        {isAvailable ? 'Entradas disponibles' : 'Entradas agotadas'}
      </p>
    </div>
  )
}
