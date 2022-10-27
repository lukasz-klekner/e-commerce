import Link from 'next/link'
import Image from 'next/image'

import { ProductDetails } from './ProductDetails'
import { useCartState } from './Cart/CartContext'

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt'
>

interface ProductListItemProps {
  data: ProductListItem
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const { addItemToCart } = useCartState()

  return (
    <>
      <div className='bg-white p-8 rounded-xl'>
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout='responsive'
          width={16}
          height={9}
          objectFit='contain'
        />
      </div>
      <Link href={`details/${data.id}`}>
        <a>
          <h2 className='p-4 text-2xl text-bold'>{data.title}</h2>
        </a>
      </Link>

      <button
        className='m-4 inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'
        onClick={() =>
          addItemToCart({
            id: data.id,
            price: 10,
            title: data.title,
            count: 1,
          })
        }
      >
        Dodaj do koszyka
      </button>
    </>
  )
}