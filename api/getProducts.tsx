interface StoreAPIResponse {
  id: number
  title: string
  price: number
  description: string
  longDescription: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const LIMIT = 24

export const getProductsPerPage = async (page: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${LIMIT}&offset=${
      (page - 1) * LIMIT
    }`
  )
  const data: StoreAPIResponse[] = await response.json()

  return data
}

export const getProducts = async (quantity: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${quantity}`
  )
  const data: StoreAPIResponse[] = await response.json()

  return data
}

export const getProduct = async (id: string) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${id}`
  )
  const data: StoreAPIResponse = await response.json()
  return data
}
