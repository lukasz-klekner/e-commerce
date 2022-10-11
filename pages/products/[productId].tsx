import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { ProductDetails } from '../../components/Product'

const ProductsDetailsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <>
      <Link href='/products'>
        <a>Wróć do strony produktów</a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          description: data.description,
          title: data.title,
          thumbnailAlt: data.title,
          rating: data.rating.rate,
          thumbnailUrl: data.image,
        }}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  const data: StoreAPIResponse[] = await response.json()

  return {
    paths: data.map((prodcut) => {
      return {
        params: {
          productId: prodcut.id.toString(),
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
    }
  }

  const response = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  )
  const data: StoreAPIResponse | null = await response.json()

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

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>
}>
  ? { params?: R }
  : never

export default ProductsDetailsPage
