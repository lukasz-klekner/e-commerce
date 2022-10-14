import Link from 'next/link'
import Image from 'next/image'

import { Rating } from './Rating'

interface ProductProps {
  data: ProductDetails
}
interface ProductDetails {
  id: number
  description: string
  title: string
  thumbnailUrl: string
  thumbnailAlt: string
  rating: number
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className='bg-white p-8'>
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout='responsive'
          width={16}
          height={9}
          objectFit='contain'
        />
      </div>
      <div>
        <h2 className='p-4 text-2xl text-bold'>{data.title}</h2>
        <p className='p-4'>{data.description}</p>
        <Rating rating={data.rating} />
      </div>
    </>
  )
}

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
      <div className='bg-white p-8'>
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout='responsive'
          width={16}
          height={9}
          objectFit='contain'
        />
      </div>
      <Link href={`products/${data.id}`}>
        <a>
          <h2 className='p-4 text-2xl text-bold'>{data.title}</h2>
        </a>
      </Link>
    </>
  )
}
