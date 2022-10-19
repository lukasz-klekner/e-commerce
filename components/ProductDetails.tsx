import { NextSeo } from 'next-seo'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { Rating } from './Rating'

export interface ProductDetails {
  id: number
  description: string
  title: string
  thumbnailUrl: string
  thumbnailAlt: string
  rating: number
  longDescription: string
}

interface ProductProps {
  data: ProductDetails
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className='bg-white p-8'>
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`shop-lukasz-klekner.vercel.app`}
          openGraph={{
            url: `shop-lukasz-klekner.vercel.app`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: 'image/jpeg',
              },
            ],
            site_name: 'E-commerce',
          }}
        />
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
        <article className='prose prose-xl p-4'>
          <ReactMarkdown>{data.longDescription}</ReactMarkdown>
        </article>
        <Rating rating={data.rating} />
      </div>
    </>
  )
}
