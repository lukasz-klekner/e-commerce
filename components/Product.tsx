import { Rating } from './Rating'

interface ProductProps {
  data: {
    description: string
    title: string
    thumbnailUrl: string
    thumbnailAlt: string
    rating: number
  }
}

export const Product = ({ data }: ProductProps) => {
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
