import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { HeaderResponsive } from '@/components/Layouts/Home/Header'
import { FeaturesTitle } from '@/components/Sections/Features'
import { AppWindow, ClearAll, Cloud, Users } from 'tabler-icons-react'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  const links = [
    { label: 'Home', link: '/' },
    { label: 'Support', link: '/support' },
  ]

  if (!user) {
    links.push(
      { label: 'Register', link: '/register' },
      { label: 'Login', link: '/login' },
    )
  } else {
    links.push({ label: 'Dashboard', link: '/dashboard' })
  }

  const features = [
    {
      icon: ClearAll,
      title: 'Just simple',
      description: 'Nothing unnecessary',
    },
    {
      icon: AppWindow,
      title: 'Use offline',
      description: 'Install progressive web app',
    },
    {
      icon: Users,
      title: 'Team manager',
      description: 'Flexible role assignment',
    },
    {
      icon: Cloud,
      title: 'Cloud based',
      description: 'Complete synchronization',
    },
  ]

  return (
    <>
      <Head>
        <title>Main Page | NextCRM</title>
      </Head>

      <HeaderResponsive user={user} links={links} />
      <FeaturesTitle features={features} />
    </>
  )
}
