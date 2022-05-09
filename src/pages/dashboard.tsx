import Head from 'next/head'
import { SimpleGrid, Container, Space } from '@mantine/core'
import AppLayout from '@/components/Layouts/AppLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { ProgressCard } from '@/components/ProgressCard'
import { StatsGrid } from '@/components/StatsGrid'
import { ActionsLog } from '@/components/ActionsLog'

const Dashboard = () => {
  const { t } = useTranslation('crm')
  const breadcrumbs = [{ title: t('Dashboard'), href: '/dashboard' }]

  const processedStats = {
    title: t('Processed leads'),
    completed: 40,
    label: t('Processed'),
    total: 45,
    stats: [
      {
        value: 5,
        label: t('Remaining'),
      },
      {
        value: 2,
        label: t('In progress'),
      },
    ],
  }

  const monthlyStats = {
    data: [
      {
        title: t('Revenue'),
        icon: 'coin',
        value: '$ 3 281',
        diff: 34,
      },
      {
        title: t('Orders'),
        icon: 'orders',
        value: '6',
        diff: 18,
      },
      {
        title: t('Clients'),
        icon: 'user',
        value: '3',
        diff: -8,
      },
    ],
  }

  return (
    <AppLayout header={t('Dashboard')} breadcrumbs={breadcrumbs}>
      <Head>
        <title>{t('Dashboard | NextCRM')}</title>
      </Head>

      <Container mt="md" p={0} fluid>
        <StatsGrid data={monthlyStats.data} />
        <Space h="md" />
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <ProgressCard data={processedStats} />
          <ActionsLog />
        </SimpleGrid>
      </Container>
    </AppLayout>
  )
}

export default Dashboard

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
