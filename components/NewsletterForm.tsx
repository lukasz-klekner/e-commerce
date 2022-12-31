import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InferType } from 'yup'

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

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
    const response = await fetch('http://localhost:3000/api/mailerliter',{ 
        method: 'POST',     
        headers: {
            'Content-Type': 'application/json'
        },     
        body: JSON.stringify({
            email
        })})
    } catch (error) {
        console.error(error)
    }
  })

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
                    />

                    <span role='alert' className='text-red-500 text-xs'>
                        {errors.email?.message}
                    </span>
                </div>

                <div>
                  <button
                    className='block w-full rounded-lg bg-black p-2.5 text-sm text-white'
                    type='submit'
                  >
                    Subscribe now!
                  </button>
                </div>
              </form>
            </div>
          </div>
    </section>
  )
}
