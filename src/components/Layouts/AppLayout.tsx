import React from 'react'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import {
  UnstyledButton,
  createStyles,
  MediaQuery,
  ScrollArea,
  Container,
  AppShell,
  Divider,
  Navbar,
  Header,
  Footer,
  Avatar,
  Burger,
  Group,
  Text,
  Menu,
} from '@mantine/core'

import {
  PresentationAnalytics,
  SwitchHorizontal,
  FileAnalytics,
  AddressBook,
  Adjustments,
  ChevronDown,
  Settings,
  Logout,
  Users,
  Gauge,
  Lock,
} from 'tabler-icons-react'
import { ColorSchemeToggle } from '@/components/ColorScheme'
import { LinksGroup } from '@/components/LinksGroup/LinksGroup'
import { TextLogo } from '@/components/ApplicationLogo'

const navbarLinks = [
  { label: 'Dashboard', icon: Gauge },
  {
    label: 'Clients',
    icon: AddressBook,
    initiallyOpened: false,
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
      { label: 'Manage', link: '/users' },
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
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

const AppLayout = ({ header, children }) => {
  const { user, logout } = useAuth({ middleware: 'auth' })
  const [opened, setOpened] = useState(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const { classes, theme, cx } = useStyles()
  const links = navbarLinks.map(item => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={70} p="md">
          <Group sx={{ height: '100%' }} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened(o => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <TextLogo />
            <ColorSchemeToggle />
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}>
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            {links}
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={70} p="md">
          <Group position="left">
            <Menu
              size={260}
              placement="end"
              transition="pop-bottom-left"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              control={
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}>
                  <Group spacing={7}>
                    <Avatar
                      src={user?.image}
                      alt={user?.name}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user?.name}
                    </Text>
                    <ChevronDown size={12} />
                  </Group>
                </UnstyledButton>
              }>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<Settings size={14} />}>
                Account settings
              </Menu.Item>
              <Menu.Item icon={<SwitchHorizontal size={14} />}>
                Change account
              </Menu.Item>

              <Divider />
              <Menu.Item
                color="red"
                icon={<Logout size={14} />}
                onClick={logout}>
                Logout
              </Menu.Item>
            </Menu>
          </Group>
        </Footer>
      }>
      <Text>{header}</Text>
      {children}
    </AppShell>
  )
}

export default AppLayout
