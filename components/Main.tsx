import { ReactNode } from "react"

interface MainProps {
    children: ReactNode
  }

  export const Main = ({ children } : MainProps) => {
    return (
      <main className="bg-blue-500 text-white flex-grow p-6 gap-6 grid sm:grid-cols-2">
        {children}
      </main>
    )
  }