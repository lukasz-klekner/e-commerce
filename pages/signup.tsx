import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InferType } from 'yup'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const signupFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  
type SignupFormData = InferType<typeof signupFormSchema>

const SingupPage = () => {
    const session = useSession()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SignupFormData>({
        resolver: yupResolver(signupFormSchema),
      })
    
      const onSubmit = handleSubmit(async (data) => {
        await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },     
            body: JSON.stringify(data)
        })
      })
      
    if(session.status === 'authenticated'){
        router.push('/')
        return null
      }

    return (
        <section>
        <h1 className='sr-only'>Set up an account</h1>
  
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
                          {...register(`email`, { required: true})}
                      />
  
                      <span role='alert' className='text-red-500 text-xs'>
                          {errors.email?.message}
                      </span>
                  </div>

                  <div className='mb-4 flex items-center gap-2'>
                      <label className='mb-1 block text-sm text-gray-600' htmlFor='password'>
                          Password
                      </label>
  
                      <input
                          className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
                          type='password'
                          id='password'
                          {...register(`password`, { required: true})}
                      />
  
                      <span role='alert' className='text-red-500 text-xs'>
                          {errors.password?.message}
                      </span>
                  </div>
  
                  <div>
                    <button
                      className='block w-full rounded-lg bg-black p-2.5 text-sm text-white'
                      type='submit'
                    >
                      Set up an account!
                    </button>
                  </div>
                </form>
              </div>
            </div>
      </section>
    )
}

export default SingupPage