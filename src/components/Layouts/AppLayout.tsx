import React from 'react'
import Link from 'next/link'
import { routes } from '@/router'
import { useAuth } from '@/hooks/auth'
import { useDisclosure } from '@mantine/hooks'
import {
  createStyles,
  Breadcrumbs,
  Container,
  AppShell,
  Title,
  Anchor,
} from '@mantine/core'
import Header from '@/components/Layouts/App/Header'
import Navbar from '@/components/Layouts/App/Navbar'
import Footer from '@/components/Layouts/App/Footer'

const useStyles = createStyles(theme => ({
  main: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
}))

const AppLayout = ({ header = null, breadcrumbs = [], children }) => {
  const { user } = useAuth({ middleware: 'auth' })
  const { classes } = useStyles()
  const [opened, disclosure] = useDisclosure(false)

  breadcrumbs = breadcrumbs.map((item, index) => (
    <Link href={item.href} key={index} passHref>
      <Anchor>{item.title}</Anchor>
    </Link>
  ))

  return (
    <AppShell
      fixed
      className={classes.main}
      asideOffsetBreakpoint="sm"
      navbarOffsetBreakpoint="sm"
      header={<Header height={75} opened={opened} disclosure={disclosure} />}
      navbar={
        <Navbar width={{ sm: 200, lg: 300 }} links={routes} opened={opened} />
      }
      footer={<Footer height={70} user={user} />}>
      {(header || breadcrumbs.length > 0) && (
        <Container p={0} fluid>
          {breadcrumbs.length > 0 && <Breadcrumbs>{breadcrumbs}</Breadcrumbs>}
          {header &&
            (!React.isValidElement(header) ? (
              <Title order={1}>{header}</Title>
            ) : (
              header
            ))}
        </Container>
      )}
      {children}
    </AppShell>
  )
}

export default AppLayout
