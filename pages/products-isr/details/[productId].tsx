import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'

import { ProductDetails } from '../../../components/ProductDetails'
import { InferGetStaticPathsType } from '../../../types'
import { getProduct, getProducts } from '../../../api/getProducts'

const ProductPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`shop-lukasz-klekner.vercel.app/products-isr.details/${data.id}`}
        openGraph={{
          url: `shop-lukasz-klekner.vercel.app/products-isr.details/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              alt: data.title,
              type: 'image/jpeg',
            },
          ],
          site_name: 'E-commerce',
        }}
      />
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
