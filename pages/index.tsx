import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto w-full">
      <Header />

      <main className="bg-blue-500 text-white flex-grow px-4 py-2">
        Główna treść
      </main>

      <Footer />
    </div>
  )
}

export default Home
