import Head from 'next/head'
import { MantineProvider } from '@mantine/core'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NextCRM</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default App
