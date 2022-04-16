import Head from 'next/head'
import { Text } from '@mantine/core'
import AppLayout from '@/components/Layouts/AppLayout'

const Dashboard = () => {
  return (
    <AppLayout header={<h2>Dashboard</h2>}>
      <Head>
        <title>Laravel - Dashboard</title>
      </Head>

      <Text>You're logged in!</Text>
    </AppLayout>
  )
}

export default Dashboard
