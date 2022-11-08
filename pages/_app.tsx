import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ApolloProvider } from '@apollo/client'

import '../styles/globals.css'
import { Layout } from '../components/Layout'
import SEO from '../next-seo.config'
import { CartStateContextProvider } from '../components/Cart/CartContext'
import { apolloClient } from '../graphql/apolloClient'

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartStateContextProvider>
        <QueryClientProvider client={client}>
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </CartStateContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
