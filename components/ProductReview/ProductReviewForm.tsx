import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InferType } from 'yup'
import { GetReviewsForProductSlugDocument, useCreateProductReviewMutation } from '../../generated/graphql'


const reviewFormSchema = yup.object({
  content: yup.string().required(),
  headline: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  rating: yup.number().min(1).max(5).required(),
})

type FormData = InferType<typeof reviewFormSchema>

interface ProductReviewFormProps {
  productSlug: string
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(reviewFormSchema),
  })

  const [createReview, { data }] = useCreateProductReviewMutation({
    refetchQueries: [
      {
        query: GetReviewsForProductSlugDocument,
        variables: {
          slug: productSlug
        }
      }
    ]
  })

  const onSubmit = handleSubmit(data => {
    createReview({
      variables:{
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug
            }
          }
        }
      }
    })
  })

  return (
    <section>
      <h4 className='sr-only'>Add a new comment</h4>

          <div className='bg-white py-12 md:py-24'>
            <div className='mx-auto max-w-lg px-4 lg:px-8'>
              <form className='flex flex-col' onSubmit={onSubmit}>
                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Content
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        id='content'
                        {...register(`content`)}
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.content?.message}
                    </span>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Headline
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        id='headline'
                        {...register(`headline`)}
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.headline?.message}
                    </span>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Name
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        id='name'
                        {...register(`name`)}
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.name?.message}
                    </span>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Email
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        id='content'
                        {...register(`email`)}
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.email?.message}
                    </span>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Rating
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        type='number'
                        id='rating'
                        {...register(`rating`)}
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.rating?.message}
                    </span>
                </div>

                <div>
                  <button
                    className='block w-full rounded-lg bg-black p-2.5 text-sm text-white'
                    type='submit'
                  >
                    Add a comment!
                  </button>
                </div>
              </form>
            </div>
          </div>
    </section>
  )
}
