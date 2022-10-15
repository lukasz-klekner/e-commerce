interface StoreAPIResponse {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const LIMIT = 24

export const getProducts = async (page: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${LIMIT}&offset=${
      (page - 1) * LIMIT
    }`
  )
  const data: StoreAPIResponse[] = await response.json()

  return data
}
