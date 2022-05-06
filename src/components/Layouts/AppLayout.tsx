import React from 'react'
import { routes } from '@/router'
import { useAuth } from '@/hooks/auth'
import { useDisclosure } from '@mantine/hooks'
import { createStyles, AppShell, Text } from '@mantine/core'
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

const AppLayout = ({ header, children }) => {
  const { user } = useAuth({ middleware: 'auth' })
  const { classes } = useStyles()
  const [opened, disclosure] = useDisclosure(false)

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
      <Text>{header}</Text>
      {children}
    </AppShell>
  )
}

export default AppLayout
