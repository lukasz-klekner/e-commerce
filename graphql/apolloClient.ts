import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla6rcsg90cll01ujh0ocbp0f/master',
  cache: new InMemoryCache(),
})

export const authorizedApolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla6rcsg90cll01ujh0ocbp0f/master',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
  }
})
