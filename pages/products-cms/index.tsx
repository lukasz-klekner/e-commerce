import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'

import { ProductListItem } from '../../components/ProductListItem'
import { apolloClient } from '../../graphql/apolloClient'

interface Product {
  id: string
  slug: string
  name: string
  price: number
  images: Image[]
}

interface Image {
  url: string
}

interface GetProductListResponse {
  products: Product[]
}

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (!data) {
    return <div>Coś poszło nie tak :(</div>
  }

  return (
    <div className='flex flex-col'>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8'>
        {data.products.map(({ id, slug, name, images }) => (
          <li key={id} className='shadow-xl border-2 p-4 rounded-xl'>
            <ProductListItem
              data={{
                id,
                slug,
                title: name,
                thumbnailAlt: name,
                thumbnailUrl: images[0].url,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductListResponse>({
    query: gql`
      query getProductsList {
        products {
          id
          slug
          name
          price
          images(first: 1) {
            url
          }
        }
      }
    `,
  })

  return {
    props: {
      data,
    },
  }
}

export default ProductsPage
