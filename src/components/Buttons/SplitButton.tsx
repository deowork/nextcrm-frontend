import React from 'react'
import Link from 'next/link'
import {
  createStyles,
  Button,
  Menu,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core'
import { ChevronDown } from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  button: {
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}))

export function SplitButton({ controlButton }) {
  const { t } = useTranslation('actions')
  const { classes, theme } = useStyles()

  return (
    <Group noWrap spacing={0}>
      <Link href={controlButton.href} passHref>
        <Button component="a" className={classes.button}>
          {t(controlButton.name)}
        </Button>
      </Link>
      {controlButton.menu && (
        <Menu
          control={
            <ActionIcon
              variant="filled"
              color={theme.primaryColor}
              size={36}
              className={classes.menuControl}>
              <ChevronDown size={16} />
            </ActionIcon>
          }
          transition="pop-top-right"
          placement="end"
          size="lg">
          {controlButton.menu.map(item => (
            <Menu.Item
              icon={item.icon}
              rightSection={
                <Text
                  size="xs"
                  transform="uppercase"
                  weight={700}
                  color="dimmed">
                  {item.hotkey}
                </Text>
              }>
              {t(item.name)}
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Group>
  )
}
