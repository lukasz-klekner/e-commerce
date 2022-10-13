import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { ProductListItem } from '../../components/Product'
import { Pagination } from '../../components/Pagination'

const ProductsPage = ({
  data,
  pageId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {data.map(({ id, image, title }) => (
          <li key={id} className='shadow-xl border-2 p-4'>
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
        currentPage={Number(pageId)}
        onPageChange={(page: number) => router.push(`/products-ssg/${page}`)}
      />
    </div>
  )
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
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productsPage) {
    return {
      props: {},
    }
  }

  const response = await getProducts(Number(params.productsPage))

  return {
    props: {
      data: response,
      pageId: params.productsPage,
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

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>
}>
  ? { params?: R }
  : never

export default ProductsPage
