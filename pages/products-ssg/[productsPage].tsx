import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

import { InferGetStaticPathsType } from '../../types'
import { getProducts } from '../../api/getProducts'
import { ProductListItem } from '../../components/ProductListItem'
import { Pagination } from '../../components/Pagination'

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div>
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
      <Pagination
        quantity={10}
        currentPage={Number(router.query.productsPage)}
        onPageChange={(page: number) => router.push(`/products-ssg/${page}`)}
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
    fallback: false,
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

  const response = await getProducts(Number(params.productsPage))

  return {
    props: {
      data: response,
    },
  }
}

export default ProductsPage
