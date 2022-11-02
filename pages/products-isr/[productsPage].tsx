import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'

import { InferGetStaticPathsType } from '../../types'
import { getPageNumer, getProductsPerPage } from '../../api/getProducts'
import { ProductListItem } from '../../components/ProductListItem'

const ProductsPage = ({
  data,
  pageCounter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div className='flex flex-col'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8'>
        {data.map(({ id, image, title }) => (
          <li key={id} className='shadow-xl border-2 p-4 rounded-xl'>
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
      <ReactPaginate
        nextLabel='>'
        onPageChange={({ selected }: { selected: number }) =>
          router.push(`/products-isr/${selected}`)
        }
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCounter}
        previousLabel='<'
        pageClassName='border-2 border-indigo-500 p-2 rounded-xl w-12 text-center'
        pageLinkClassName='text-indigo-500 font-bold'
        previousClassName='border-2 border-indigo-500 p-2 rounded-xl w-12 text-center'
        previousLinkClassName='text-indigo-500 font-bold'
        nextClassName='border-2 border-indigo-500 p-2 rounded-xl w-12 text-center'
        nextLinkClassName='text-indigo-500 font-bold'
        breakLabel='...'
        breakClassName='border-2 border-indigo-500 p-2 rounded-xl w-12 text-center'
        breakLinkClassName='text-indigo-500 font-bold'
        containerClassName='self-end pr-8 flex gap-4'
        activeClassName='bg-tail-500'
      />
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 10 }, (_, i) => i + 1).map((item) => {
      return {
        params: {
          productsPage: item.toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productsPage) {
    return {
      props: {},
    }
  }

  const response = await getProductsPerPage(Number(params.productsPage))
  const page = await getPageNumer()

  return {
    props: {
      data: response,
      pageCounter: page,
    },
    revalidate: 360000,
  }
}

export default ProductsPage
