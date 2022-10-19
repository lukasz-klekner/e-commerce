import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ProductDetails } from '../../../components/ProductDetails'

import { InferGetStaticPathsType } from '../../../types'
import { getProduct, getProducts } from '../../../api/getProducts'

const ProductPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div>
      <ProductDetails
        data={{
          id: data.id,
          description: data.description,
          rating: data.rating.rate,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          title: data.title,
          longDescription: data.longDescription,
        }}
      />
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await getProducts(500)

  return {
    paths: data.map(({ id }) => {
      return {
        params: {
          productId: id.toString(),
        },
      }
    }),
    fallback: true,
  }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
  if (!params?.productId) {
    return {
      props: {},
    }
  }

  const data = await getProduct(params.productId)
  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export default ProductPage
