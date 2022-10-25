import { CartContent } from '../components/Cart/CartContent'
import { CartSummary } from '../components/Cart/CartSummary'

const CartPage = () => {
  return (
    <div className='grid grid-cols-3 max-w-5xl mx-auto mt-4 gap-8'>
      <CartContent />
      <CartSummary />
    </div>
  )
}

export default CartPage
