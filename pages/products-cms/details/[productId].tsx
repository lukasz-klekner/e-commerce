import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'
import { gql } from '@apollo/client'

import { InferGetStaticPathsType } from '../../../types'
import { apolloClient } from '../../../graphql/apolloClient'
import { ProductDetails as ProductDetailsComponent } from '../../../components/ProductDetails'

const ProductPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://shop-five-tan.vercel.app/products-isr/details/${data.id}`}
        openGraph={{
          url: `https://shop-five-tan.vercel.app/products-isr/details/${data.id}`,
          title: data.name,
          description: data.description,
          images: [
            {
              url: data.images[0].url,
              alt: data.name,
              type: 'image/jpeg',
            },
          ],
          site_name: 'E-commerce',
        }}
      />
      <ProductDetailsComponent
        data={{
          id: data.id,
          slug: data.slug,
          description: data.description,
          rating: 5,
          thumbnailAlt: data.name,
          thumbnailUrl: data.images[0].url,
          title: data.name,
          longDescription: data.longDescription,
        }}
      />
    </div>
  )
}

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsResponse>({
    query: gql`
      query getProductsSlugs {
        products {
          slug
        }
      }
    `,
  })

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.slug,
        },
      }
    }),
    fallback: false,
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

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugResponse,
    { slug: string }
  >({
    variables: {
      slug: params.productId,
    },
    query: gql`
      query GetProductDetailsBySlug($slug: String) {
        product(where: { slug: $slug }) {
          id
          slug
          name
          price
          description
          images(first: 1) {
            url
          }
        }
      }
    `,
  })

  if (!data || !data.product) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
    revalidate: 10,
  }
}

interface ProductsSlugs {
  slug: string
}

interface GetProductsSlugsResponse {
  products: ProductsSlugs[]
}

interface ProductDetails {
  id: string
  slug: string
  name: string
  price: number
  description: string
  images: Image[]
}

interface Image {
  url: string
}

interface GetProductDetailsBySlugResponse {
  product: ProductDetails
}

export default ProductPage
