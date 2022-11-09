import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { ProductListItem } from '../../components/ProductListItem'
import { apolloClient } from '../../graphql/apolloClient'
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from '../../generated/graphql'

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  })

  return {
    props: {
      data,
    },
  }
}

export default ProductsPage
