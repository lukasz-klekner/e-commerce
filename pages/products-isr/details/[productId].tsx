import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'

import { ProductDetails } from '../../../components/ProductDetails'
import { InferGetStaticPathsType } from '../../../types'
import { getProduct, getProducts } from '../../../api/getProducts'
import { title } from 'process'

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
        canonical={`https://shop-five-tan.vercel.app/products-isr/details/${data.id}`}
        openGraph={{
          url: `https://shop-five-tan.vercel.app/products-isr/details/${data.id}`,
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
          id: data.id.toString(),
          slug: title,
          description: data.description,
          price: data.price,
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
  const data = await getProducts(2)

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
      notFound: true,
    }
  }

  const data = await getProduct(params.productId)

  if (!data) {
    return {
      props: {},
      notFound: true,
    }
  }

  const parsedMarkdown = await serialize(data.longDescription)

  return {
    props: {
      data: {
        ...data,
        longDescription: parsedMarkdown,
      },
    },
    revalidate: 10,
  }
}

export default ProductPage
