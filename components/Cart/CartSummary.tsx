import { useCartState } from './CartContext'

export const CartSummary = () => {
  const { items } = useCartState()

  return (
    <div className='pl-8'>
      <div>Podsumowanie koszyka</div>
      <div className='font-bold'>Liczba elementów: {items.length}</div>
    </div>
  )
}
