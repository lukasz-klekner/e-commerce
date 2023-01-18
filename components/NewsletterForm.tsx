import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InferType } from 'yup'

import { useAddEmailToNewsletterMutation } from '../hooks/useAddEmailToNewsletterMutation'

const newsletterFormSchema = yup.object({
  email: yup.string().email().required(),
})

type FormData = InferType<typeof newsletterFormSchema>

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(newsletterFormSchema),
  })

  const { mutate, status } = useAddEmailToNewsletterMutation()  

  const onSubmit = handleSubmit(data => mutate(data))

  return (
    <section>
      <h1 className='sr-only'>Checkout</h1>

          <div className='bg-white py-12 md:py-24'>
            <div className='mx-auto max-w-lg px-4 lg:px-8'>
              <form className='flex flex-col' onSubmit={onSubmit}>
                <div className='mb-4 flex items-center gap-2'>
                    <label className='mb-1 block text-sm text-gray-600' htmlFor='email'>
                        Email
                    </label>

                    <input
                        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                        type='email'
                        id='email'
                        {...register(`email`)}
                        data-testid='email-newsletter-input'
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.email?.message}
                    </span>
                </div>

                <div>
                  <button
                    className='block w-full rounded-lg bg-black p-2.5 text-sm text-white'
                    type='submit'
                    data-testid='email-newsletter-button'
                  >
                    Subscribe now!
                  </button>
                  {status === 'success' && 'Zostales dodany do newslettera!'}
                </div>
              </form>
            </div>
          </div>
    </section>
  )
}
