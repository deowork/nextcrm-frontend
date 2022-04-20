import Head from 'next/head'
import { Text } from '@mantine/core'
import AppLayout from '@/components/Layouts/AppLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Dashboard = () => {
  const { t } = useTranslation('crm')

  return (
    <AppLayout header={<h2>{t('Dashboard')}</h2>}>
      <Head>
        <title>{t('Dashboard | NextCRM')}</title>
      </Head>

      <Text>{t("You're logged in")}!</Text>
    </AppLayout>
  )
}

export default Dashboard

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
