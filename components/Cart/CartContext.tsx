import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  title: string
  price: number
}

interface CartState {
  items: CartItem[]
}

export const CartStateContext = createContext<CartState | null>(null)

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      title: 'Koszulka',
      price: 23.99,
    },
    {
      title: 'Spodnie',
      price: 99.99,
    },
  ])

  return (
    <CartStateContext.Provider value={{ items: cartItems }}>
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
