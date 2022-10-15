import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductDetails } from '../components/ProductDetails'
import { Main } from '../components/Main'

const DUMMY_DATA = {
  id: 111,
  description:
    'Tradycyjnie uznawano go za podobiznę Josefy Bayeu, jedynej żony artysty, gdyż tak został opisany w jednym z inwentarzy przeprowadzonych w domu Goi, a następnie w muzealnych katalogach. Obecnie krytycy sztuki mają wątpliwości co do tej identyfikacji, a także daty powstania samego obrazu. Nie udało się stwierdzić z całkowitą pewnością, kogo przedstawia portret. Według historyków sztuki z Prado – najprawdopodobniej jest to podobizna Leokadii Zorrilli de Weiss, młodej szlachcianki, towarzyszki życia Goi po śmierci jego żony. Prawdopodobnie nie był to obraz wykonany na zamówienie – w przeciwieństwie do większości portretów pędzla Goi, lecz dzieło o prywatnym charakterze przedstawiające osobę z bliskiego otoczenia artysty. Ze względu na',
  thumbnailUrl: 'https://picsum.photos/id/1060/536/354',
  thumbnailAlt: 'barista nalewa kawe do Chemexa',
  rating: 5,
  title: 'Fake product',
}

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen max-w-7xl mx-auto w-full'>
      <Header />

      <Main>
        <ProductDetails data={DUMMY_DATA} />
      </Main>

      <Footer />
    </div>
  )
}

export default Home
