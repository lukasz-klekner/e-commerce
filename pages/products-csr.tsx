import { useState } from 'react'
import { useQuery } from 'react-query'

import { Pagination } from '../components/Pagination'
import { ProductDetails } from '../components/Product'

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

const LIMIT = 25

const getProducts = async (page: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${LIMIT}&offset=${
      (page - 1) * 25
    }`
  )
  const data: StoreAPIResponse[] = await response.json()

  return data
}

const ProductsCSRPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useQuery(
    ['products', currentPage],
    () => getProducts(currentPage),
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || error) {
    return <div>Coś poszło nie tak :-(</div>
  }

  return (
    <div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {data.map(({ id, description, image, title, rating }) => (
          <li key={id} className='shadow-3xl border-2 p-4'>
            <ProductDetails
              data={{
                id,
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
      <Pagination
        quantity={10}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  )
}

export default ProductsCSRPage
