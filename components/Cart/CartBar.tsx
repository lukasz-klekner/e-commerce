import Link from 'next/link'

import { Cart } from '../../icons/Cart'
import { useCartState } from './CartContext'

export const CartBar = () => {
  const { items } = useCartState()

  const totalCount = items.reduce((acc, item) => acc + item.count, 0)

  return (
    <Link href='/cart'>
      <a className='inline-flex gap-2'>
        <Cart />
        <span>{totalCount}</span>
      </a>
    </Link>
  )
}
