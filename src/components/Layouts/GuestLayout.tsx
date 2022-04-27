import Head from 'next/head'

const GuestLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Guest | NextCRM</title>
      </Head>

      <div>{children}</div>
    </>
  )
}

export default GuestLayout
