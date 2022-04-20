import React from 'react'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { HeaderResponsive } from '@/components/Layouts/Home/Header'
import { FeaturesTitle } from '@/components/Sections/Features'
import { AppWindow, ClearAll, Cloud, Users } from 'tabler-icons-react'
import { FooterSocial } from '@/components/Layouts/Home/Footer'
import { Text } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { t } = useTranslation('common')
  const { user } = useAuth({ middleware: 'guest' })

  const links = [
    { label: t('Home'), link: '/' },
    { label: t('Support'), link: '/support' },
  ]

  if (!user) {
    links.push(
      { label: t('Register'), link: '/register' },
      { label: t('Login'), link: '/login' },
    )
  } else {
    links.push({ label: t('Dashboard'), link: '/dashboard' })
  }

  const features = [
    {
      icon: ClearAll,
      title: t('Just simple'),
      description: t('Nothing unnecessary'),
    },
    {
      icon: AppWindow,
      title: t('Use offline'),
      description: t('Install progressive web app'),
    },
    {
      icon: Users,
      title: t('Team manager'),
      description: t('Flexible role assignment'),
    },
    {
      icon: Cloud,
      title: t('Cloud based'),
      description: t('Complete synchronization'),
    },
  ]

  return (
    <>
      <Head>
        <title>{t('Main Page | NextCRM')}</title>
      </Head>

      <HeaderResponsive user={user} links={links} />
      <FeaturesTitle
        title={
          <>
            {t('Minimalistic modern')}{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit>
              {t('CRM')}
            </Text>
          </>
        }
        description={t('The perfect solution for start-up business')}
        actions={{
          primary: t('Get started'),
          secondary: t('Contact us'),
        }}
        features={features}
      />
      <FooterSocial user={user} />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
