import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

export const Main = ({ children }: MainProps) => {
  return <main className='text-black p-6 gap-6'>{children}</main>
}
