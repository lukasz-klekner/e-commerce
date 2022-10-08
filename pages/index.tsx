import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto w-full">
      <Header />

      <main className="bg-blue-500 text-white flex-grow p-6 gap-6 grid sm:grid-cols-2">
        <img src='https://picsum.photos/id/1060/536/354' alt='barista nalewa kawe do Chemexa'/>
        <p>Tradycyjnie uznawano go za podobiznę Josefy Bayeu, jedynej żony artysty, gdyż tak został opisany w jednym z inwentarzy przeprowadzonych w domu Goi, a następnie w muzealnych katalogach. Obecnie krytycy sztuki mają wątpliwości co do tej identyfikacji, a także daty powstania samego obrazu. Nie udało się stwierdzić z całkowitą pewnością, kogo przedstawia portret. Według historyków sztuki z Prado – najprawdopodobniej jest to podobizna Leokadii Zorrilli de Weiss, młodej szlachcianki, towarzyszki życia Goi po śmierci jego żony. Prawdopodobnie nie był to obraz wykonany na zamówienie – w przeciwieństwie do większości portretów pędzla Goi, lecz dzieło o prywatnym charakterze przedstawiające osobę z bliskiego otoczenia artysty. Ze względu na</p>
      </main>

      <Footer />
    </div>
  )
}

export default Home
