import { InferGetStaticPropsType } from 'next'

import { ProductListItem } from '../components/Product'

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {data.map(({ id, description, image, title, rating }) => (
        <li key={id} className='shadow-xl border-2 p-4'>
          <ProductListItem
            data={{
              title,
              thumbnailAlt: title,
              thumbnailUrl: image,
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data: StoreAPIResponse[] = await response.json()

  return {
    props: {
      data,
    },
  }
}

interface StoreAPIResponse {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default ProductsPage
