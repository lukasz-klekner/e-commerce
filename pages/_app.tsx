import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { Layout } from '../components/Layout'

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
