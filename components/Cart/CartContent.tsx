import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'
import { useCartState } from './CartContext'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const CartContent = () => {
  const { items, removeItemFromCart } = useCartState()

  const pay = async() => {
    const stripe = await stripePromise

    if(!stripe){
      throw new Error(`Something went wrong`)
    }

    const response = await fetch('/api/checkout',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items.map(cartItem => {
        return {
          price_data: {
            currency: 'PLN',
            unit_amount: cartItem.price * 100,
            product_data: {
                name: cartItem.title,
            }           
        },
        quantity: cartItem.count
        }
      }))
    })

    const { session }: {session: Stripe.Response<Stripe.Checkout.Session>} = await response.json()

    await stripe.redirectToCheckout({ sessionId: session.id})
  }

  return (
    <div className='col-span-2'>
      <ul className='divide-y divide-gray-200'>
        {items.map(({ id, title, price, count }, index) => {
          return (
            <li className='py-4 flex justify-between' key={`${title}_${index}`}>
              <div>
                {title} x {count}
              </div>
              <div className='flex'>
                <span>{price}</span>
                <button onClick={() => removeItemFromCart(id)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 ml-2 text-teal-600'
                    aria-label='Delete an item'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <button
        className='block w-full rounded-lg bg-black p-2.5 text-sm text-white mt-10'
        onClick={pay}
        type='button'
      >
       Zloz zamowienie     
      </button>
    </div>
  )
}
