import Link from 'next/link'
import Image from 'next/image'

import { ProductDetails } from './ProductDetails'

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailUrl' | 'thumbnailAlt'
>

interface ProductListItemProps {
  data: ProductListItem
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
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
    </>
  )
}
