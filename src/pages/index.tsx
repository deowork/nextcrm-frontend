import React, { useState } from 'react'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { HeaderResponsive } from '@/components/Layouts/Home/Header'
import { FeaturesTitle } from '@/components/Sections/Features'
import { AppWindow, ClearAll, Cloud, Users } from 'tabler-icons-react'
import { FooterSocial } from '@/components/Layouts/Home/Footer'
import { Text, Modal, Group, Button } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AuthForm from '@/components/Auth/AuthForm'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { user } = useAuth({ middleware: 'guest' })
  const [authModalOpened, setAuthModalOpened] = useState(false)

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
        actions={
          <Group>
            <Button
              mt="xl"
              radius="md"
              size="md"
              variant="gradient"
              onClick={() =>
                user ? router.push('/dashboard') : setAuthModalOpened(true)
              }
              gradient={{ deg: 125, from: 'blue', to: 'cyan' }}>
              {t('Get started')}
            </Button>
            <Button mt="xl" radius="md" size="md" variant="default">
              {t('Contact us')}
            </Button>
          </Group>
        }
        features={features}
      />
      <FooterSocial user={user} />
      <Modal
        title={t('Get started')}
        size="md"
        shadow="xl"
        opened={authModalOpened}
        overlayBlur={3}
        overlayOpacity={0.55}
        onClose={() => setAuthModalOpened(false)}>
        <AuthForm initForm="register" />
      </Modal>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
