import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen max-w-7xl mx-auto w-full'>
      <Header />
      <div className='flex-grow'>
        <Main>{children}</Main>
      </div>
      <Footer />
    </div>
  )
}
