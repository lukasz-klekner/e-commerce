import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

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
          <ReactMarkdown
            components={{
              a: ({ href, ...props }) => {
                if (!href) {
                  return <a {...props} />
                }

                const DOMAIN = process.env.APP_URL as string

                if (
                  href.startsWith('http' || 'https') &&
                  !href.includes(DOMAIN)
                ) {
                  return (
                    <a
                      {...props}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                    />
                  )
                }

                return (
                  <Link href={href}>
                    <a {...props} />
                  </Link>
                )
              },
            }}
          >
            {data.longDescription}
          </ReactMarkdown>
        </article>
        <Rating rating={data.rating} />
      </div>
    </>
  )
}
