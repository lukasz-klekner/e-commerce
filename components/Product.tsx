import Link from 'next/link'
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
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
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
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <Link href={`products/${data.id}`}>
        <a>
          <h2 className='p-4 text-2xl text-bold'>{data.title}</h2>
        </a>
      </Link>
    </>
  )
}
