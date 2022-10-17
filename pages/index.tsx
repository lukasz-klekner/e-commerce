import { ProductDetails } from '../components/ProductDetails'

const DUMMY_DATA = {
  id: 111,
  description:
    'Tradycyjnie uznawano go za podobiznę Josefy Bayeu, jedynej żony artysty, gdyż tak został opisany w jednym z inwentarzy przeprowadzonych w domu Goi, a następnie w muzealnych katalogach. Obecnie krytycy sztuki mają wątpliwości co do tej identyfikacji, a także daty powstania samego obrazu. Nie udało się stwierdzić z całkowitą pewnością, kogo przedstawia portret. Według historyków sztuki z Prado – najprawdopodobniej jest to podobizna Leokadii Zorrilli de Weiss, młodej szlachcianki, towarzyszki życia Goi po śmierci jego żony. Prawdopodobnie nie był to obraz wykonany na zamówienie – w przeciwieństwie do większości portretów pędzla Goi, lecz dzieło o prywatnym charakterze przedstawiające osobę z bliskiego otoczenia artysty. Ze względu na',
  thumbnailUrl: 'https://picsum.photos/id/1060/536/354',
  thumbnailAlt: 'barista nalewa kawe do Chemexa',
  rating: 5,
  title: 'Fake product',
  longDescription:
    '## Generic\nCarbonite web goalkeeper gloves are ergonomically designed to give easy fit\n\n### Fantastic\nThe Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J\n\n## Details\n- Plastic\n- cyan\n- Movies\n\n![](http://placeimg.com/128/128/business)\n\nEnim eum voluptatum autem vel non deleniti similique reprehenderit molestiae. [quo quasi laboriosam](http://placeimg.com/320/320/fashion) Est voluptatem consequatur.',
}

const Home = () => {
  return (
    <div className='bg-blue-500 text-white flex-grow p-6 gap-6 grid sm:grid-cols-2'>
      <ProductDetails data={DUMMY_DATA} />
    </div>
  )
}

export default Home
