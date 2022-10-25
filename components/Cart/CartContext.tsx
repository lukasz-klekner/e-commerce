import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  title: string
  price: number
}

interface CartState {
  items: CartItem[]
  addItemToCart: (cartItem: CartItem) => void
}

export const CartStateContext = createContext<CartState | null>(null)

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addItemToCart = (cartItem: CartItem) =>
    setCartItems((prevState) => [...prevState, cartItem])

  return (
    <CartStateContext.Provider value={{ items: cartItems, addItemToCart }}>
      {children}
    </CartStateContext.Provider>
  )
}

export const useCartState = () => {
  const cartState = useContext(CartStateContext)

  if (!cartState) {
    throw new Error('You forgot CartStateContextProvider')
  }

  return cartState
}
