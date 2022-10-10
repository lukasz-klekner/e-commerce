import { useQuery } from 'react-query'
import { Product } from '../components/Product'

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

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data: StoreAPIResponse[] = await response.json()

  return data
}

const ProductsCSRPage = () => {
  const { data, isLoading, error } = useQuery('products', getProducts)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || error) {
    return <div>Coś poszło nie tak :-(</div>
  }

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {data.map(({ id, description, image, title, rating }) => (
        <li key={id} className='shadow-xl border-2 p-4'>
          <Product
            data={{
              description,
              title,
              thumbnailAlt: title,
              rating: rating.rate,
              thumbnailUrl: image,
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export default ProductsCSRPage
