import { useState } from 'react'
import { useQuery } from 'react-query'

import { getProducts } from '../api/getProducts'
import { Pagination } from '../components/Pagination'
import { ProductListItem } from '../components/Product'

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
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8'>
        {data.map(({ id, image, title }) => (
          <li key={id} className='shadow-3xl border-2 p-4 rounded-xl'>
            <ProductListItem
              data={{
                id,
                title,
                thumbnailAlt: title,
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
