import Head from 'next/head'
import { useState } from 'react'
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core'
import { AppProps } from 'next/app'
import { GetServerSidePropsContext } from 'next'
import { getCookie, setCookies } from 'cookies-next'

const colorSchemeKey = 'nextcrm-scheme'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookies(colorSchemeKey, nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  return (
    <>
      <Head>
        <title>NextCRM</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}>
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie(colorSchemeKey, ctx) || 'dark',
})
