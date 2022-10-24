import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import '../styles/globals.css'
import { Layout } from '../components/Layout'
import SEO from '../next-seo.config'
import { CartStateContextProvider } from '../components/Cart/CartContext'

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartStateContextProvider>
      <QueryClientProvider client={client}>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </CartStateContextProvider>
  )
}

export default MyApp
