import { CartItem } from './CartContext'

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('CART_ITEMS')

  if (!itemsFromLocalStorage) {
    return []
  }

  try {
    const items = JSON.parse(itemsFromLocalStorage)
    return items
  } catch (error) {
    console.log(error)
    return []
  }
}

export const setCartItemsInStorage = (items: CartItem[]) => {
  localStorage.setItem('CART_ITEMS', JSON.stringify(items))
}
