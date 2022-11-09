import { useState } from 'react'
import { useQuery } from 'react-query'

import { getProductsPerPage } from '../api/getProducts'
import { Pagination } from '../components/Pagination'
import { ProductListItem } from '../components/ProductListItem'

const ProductsCSRPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useQuery(
    ['products', currentPage],
    () => getProductsPerPage(currentPage),
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
    <>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8'>
        {data.map(({ id, image, title }) => (
          <li key={id} className='shadow-3xl border-2 p-4 rounded-xl'>
            <ProductListItem
              data={{
                id: id.toString(),
                slug: title,
                title,
                thumbnailAlt: title,
                thumbnailUrl: image,
              }}
            />
          </li>
        ))}
      </ul>
      <Pagination
        maxPages={10}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  )
}

export default ProductsCSRPage
