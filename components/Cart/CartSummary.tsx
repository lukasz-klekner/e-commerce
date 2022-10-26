import { useCartState } from './CartContext'

export const CartSummary = () => {
  const { items } = useCartState()

  const totalCount = items.reduce((acc, item) => acc + item.count, 0)

  return (
    <div className='pl-8'>
      <div>Podsumowanie koszyka</div>
      <div className='font-bold'>Liczba elementów: {totalCount}</div>
    </div>
  )
}
