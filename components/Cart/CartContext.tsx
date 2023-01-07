import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCartItemsFromStorage, setCartItemsInStorage } from './CartStorage'

export interface CartItem {
  id: string
  slug: string
  title: string
  price: number
  count: number
}

interface CartState {
  items: CartItem[]
  addItemToCart: (cartItem: CartItem) => void
  removeItemFromCart: (id: CartItem['id']) => void
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

      if (existingItemIndex === -1) {
        return [...prevState, cartItem]
      }

      return prevState.map((item) =>
        item.id === cartItem.id ? { ...item, count: item.count + 1 } : item
      )
    })

  const removeItemFromCart = (id: string) =>
    setCartItems((prevState) => {
      const itemToDelete = prevState.find((item) => item.id === id)

      if (itemToDelete && itemToDelete.count === 1) {
        return prevState.filter((item) => itemToDelete.id !== item.id)
      }

      return prevState.map((item) =>
        itemToDelete?.id === item.id ? { ...item, count: item.count - 1 } : item
      )
    })

  useEffect(() => {
    setCartItems(getCartItemsFromStorage())
  }, [])

  useEffect(() => {
    setCartItemsInStorage(cartItems)
  }, [cartItems])

  return (
    <CartStateContext.Provider
      value={{ items: cartItems, addItemToCart, removeItemFromCart }}
    >
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
