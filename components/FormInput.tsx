import { DeepRequired, UseFormRegister, FieldErrorsImpl } from 'react-hook-form'
import { HTMLInputTypeAttribute } from 'react'
import { FormData } from './CheckoutForm'

interface FormInputProps {
  register: UseFormRegister<FormData>
  name: keyof FormData
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  //   error: FieldErrorsImpl<DeepRequired<FormData>>
}
export const FormInput = ({
  name,
  type = 'text',
  label,
  register,
  placeholder,
  error,
}: FormInputProps) => {
  return (
    <>
      <label className='mb-1 block text-sm text-gray-600' htmlFor='first_name'>
        {label}
      </label>

      <input
        className='w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm placeholder-gray-400'
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(`${name}`)}
      />

      <span role='alert' className='text-red-500 text-xs'>
        {error}
      </span>
    </>
  )
}
