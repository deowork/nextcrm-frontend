import React from 'react'
import { useAuth } from '@/hooks/auth'
import {
  AppShell,
  Navbar,
  Group,
  ScrollArea,
  createStyles,
} from '@mantine/core'
import {
  Users,
  AddressBook,
  Gauge,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Logout,
  Lock,
} from 'tabler-icons-react'
import { ColorSchemeToggle } from '@/components/ColorScheme'
import { UserCard } from '@/components/UserCard/UserCard'
import { LinksGroup } from '@/components/LinksGroup/LinksGroup'
import ApplicationLogo from '@/components/ApplicationLogo'

const navbarLinks = [
  { label: 'Dashboard', icon: Gauge },
  {
    label: 'Clients',
    icon: AddressBook,
    initiallyOpened: true,
    links: [
      { label: 'Manage', link: '/' },
      { label: 'Create', link: '/' },
    ],
  },
  { label: 'Contracts', icon: FileAnalytics },
  {
    label: 'Users',
    icon: Users,
    links: [
      { label: 'Manage', link: '/' },
      { label: 'Create', link: '/' },
      { label: 'Roles', link: '/' },
    ],
  },
  { label: 'Analytics', icon: PresentationAnalytics },
  { label: 'Settings', icon: Adjustments },
  {
    label: 'Security',
    icon: Lock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
]

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

const AppLayout = ({ header, children }) => {
  const { user, logout } = useAuth({ middleware: 'auth' })

  const { classes } = useStyles()
  const links = navbarLinks.map(item => (
    <LinksGroup {...item} key={item.label} />
  ))

  const logoutLink = { label: 'Logout', icon: Logout, onClick: logout }

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          height={800}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <ApplicationLogo width={50} fill="#ef3b2d" />
              <ColorSchemeToggle />
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>
              {links}
              <LinksGroup {...logoutLink} key={logoutLink.label} />
            </div>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <UserCard image={null} name={user?.name} email={user?.email} />
          </Navbar.Section>
        </Navbar>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}>
      {header}
      {children}
    </AppShell>
  )
}

export default AppLayout
