import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Logo } from '../icons/Logo'
import { CartBar } from './Cart/CartBar'

import { NavLink } from './NavLink'

const navItems = [
  { name: 'Products CSR', href: '/products-csr' },
  { name: 'Products SSG', href: '/products-ssg/1' },
  { name: 'Products ISR', href: '/products-isr/1' },
  { name: 'Products CMS', href: '/products-cms' },
  { name: 'Newsletter', href: '/newsletter' },
]

export const Header = () => {
  const session = useSession()

  return (
    <header className='bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-1 h-4 md:flex md:items-center md:gap-12'>
            <Link href='/'>
              <a className='block text-teal-600 dark:text-teal-300'>
                <span className='sr-only'>Home</span>
                <Logo />
              </a>
            </Link>
          </div>

          <div className='md:flex md:items-center md:gap-12'>
            <nav
              className='hidden md:block'
              aria-labelledby='header-navigation'
            >
              <h2 className='sr-only' id='header-navigation'>
                Header navigation
              </h2>

              <ul className='flex items-center gap-6 text-sm'>
                {navItems.map(({ href, name }) => (
                  <li key={name}>
                    <NavLink href={href} name={name} />
                  </li>
                ))}
              </ul>
            </nav>

            <CartBar />

            <div className='flex items-center gap-4'>
              <div className='sm:flex sm:gap-4'>
                {
                  session.status === 'authenticated' 
                    ? <button className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500' onClick={() => signOut()}>Sign out</button> 
                    : <button className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500' onClick={() => signIn()}>Sign in</button>
                }
                {/* <Link href='/'>
                  <a className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500'>
                    Login
                  </a>
                </Link> */}

                <div className='hidden sm:flex'>
                  <Link href='/signup'>
                    <a className='rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75'>
                      Register
                    </a>
                  </Link>
                </div>
              </div>

              <div className='block md:hidden'>
                <button className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
