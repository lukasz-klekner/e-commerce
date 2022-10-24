import { useCartState } from '../components/Cart/CartContext'

const CartPage = () => {
  const { items } = useCartState()

  return (
    <div>
      <ul>
        {items.map(({ title, price }, index) => {
          return (
            <li key={`${title}_${index}`}>
              {title} - {price}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CartPage
