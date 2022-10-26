import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  id: number
  title: string
  price: number
  count: number
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
    setCartItems((prevState) => {
      const existingItemIndex = prevState.findIndex(
        (item) => item.id === cartItem.id
      )

      if (!existingItemIndex) {
        return [...prevState, cartItem]
      }

      return prevState.map((item) =>
        item.id === cartItem.id ? { ...item, count: item.count + 1 } : item
      )
    })

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
