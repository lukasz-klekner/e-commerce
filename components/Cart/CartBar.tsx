import Link from 'next/link'

import { Cart } from '../../icons/Cart'
import { useCartState } from './CartContext'

export const CartBar = () => {
  const { items } = useCartState()

  return (
    <Link href='/cart'>
      <a className='inline-flex gap-2'>
        <Cart />
        <span>{items.length}</span>
      </a>
    </Link>
  )
}
