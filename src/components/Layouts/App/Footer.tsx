import React from 'react'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useTranslation } from 'next-i18next'
import {
  UnstyledButton,
  createStyles,
  Divider,
  Footer as CoreFooter,
  Avatar,
  Group,
  Text,
  Menu,
} from '@mantine/core'
import {
  SwitchHorizontal,
  ChevronDown,
  Settings,
  Logout,
} from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
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

const Footer = ({ user, height = 70 }) => {
  const { t } = useTranslation('crm')
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { logout } = useAuth({ middleware: 'auth' })

  return (
    <CoreFooter height={height} p="md">
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
          <Menu.Label>{t('Settings')}</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>
            {t('Account settings')}
          </Menu.Item>
          <Menu.Item icon={<SwitchHorizontal size={14} />}>
            {t('Change account')}
          </Menu.Item>

          <Divider />
          <Menu.Item color="red" icon={<Logout size={14} />} onClick={logout}>
            {t('Logout')}
          </Menu.Item>
        </Menu>
      </Group>
    </CoreFooter>
  )
}

export default Footer
