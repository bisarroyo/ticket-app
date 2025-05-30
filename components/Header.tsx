'use client'
// import Logo from '@/components/ui/logo'
import Link from 'next/link'
import Button from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { Compass, Tickets, CirclePlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Header() {
  const pathname = usePathname()

  const activeLink = (path: string) => {
    return path === pathname
  }
  return (
    <>
      <header className='md:sticky top-0 left-0 right-0 h-auto  backdrop-blur-lg border-b-1 z-10'>
        <div className='container h-auto md:h-[70px] w-full py-4 gap-4 flex justify-evenly md:justify-between items-center flex-row flex-wrap md:flex-nowrap'>
          <div className=''>
            <Link href='/' className='flex justify-center items-center'>
              <Logo height='40' width='40' />
            </Link>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Link
              href='/'
              className={cn(
                'text-black hover:text-primary transition-all duration-300 flex justify-center items-center gap-2',
                activeLink('/') && 'text-primary opacity-100'
              )}>
              <Compass className='h-8 w-8 md:h-5 md:w-5' />
              <span className='hidden md:block'>Explorar</span>
            </Link>

            <SignedIn>
              <Link
                href='/tickets'
                className={cn(
                  ' text-black hover:text-primary transition-all duration-300 flex justify-center items-center gap-2',
                  activeLink('/tickets') && 'text-primary'
                )}>
                <Tickets className='h-8 w-8 md:h-5 md:w-5' />
                <span className='hidden md:block'>Mis Eventos</span>
              </Link>
              <Link
                href='/create'
                className={cn(
                  ' text-black hover:text-primary transition-all duration-300 flex justify-center items-center gap-2',
                  activeLink('/tickets') && 'text-primary'
                )}>
                <CirclePlus className='h-8 w-8 md:h-5 md:w-5' />
                <span className='hidden md:block'>Crear Evento</span>
              </Link>
            </SignedIn>
          </div>
          <div className=''>
            <SignedOut>
              <SignInButton mode='modal'>
                <Button text='Iniciar Sesión' variant='header' />
              </SignInButton>
              <SignUpButton mode='modal'>
                <Button text='Registrate' variant='ghost' />
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      </header>
    </>
  )
}
