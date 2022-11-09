import { useQuery, gql } from '@apollo/client'

const Home = () => {
  const { data, loading, error } = useQuery(gql`
    query getProductsList {
      products {
        id
        slug
        name
        price
      }
    }
  `)

  return (
    <div className='bg-blue-500 text-white flex-grow p-6 gap-6 grid sm:grid-cols-2'>
      <div>E-commerce by Łuki</div>
    </div>
  )
}

export default Home
