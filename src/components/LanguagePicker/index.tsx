import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createStyles, UnstyledButton, Menu, Image, Group } from '@mantine/core'
import { ChevronDown } from 'tabler-icons-react'
import flags from './Flags'

const data = [
  { label: 'English', image: flags.britain, code: 'en' },
  { label: 'Ukrainian', image: flags.ukraine, code: 'ua' },
]

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}))

export function LanguagePicker() {
  const router = useRouter()
  const { pathname, locale, defaultLocale } = router
  const currentLocale = data.find(element => element.code === locale)

  const [opened, setOpened] = useState(false)
  const { classes } = useStyles({ opened })
  const [selected, setSelected] = useState(currentLocale)
  const items = data.map(item => (
    <Link
      href={item.code !== defaultLocale ? `/${item.code}${pathname}` : pathname}
      locale={item.code}
      key={item.code}>
      <Menu.Item
        icon={<Image src={item.image} width={18} height={18} />}
        onClick={() => setSelected(item)}>
        {item.label}
      </Menu.Item>
    </Link>
  ))

  return (
    <Menu
      transition="pop"
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      control={
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <ChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      }>
      {items}
    </Menu>
  )
}

export default LanguagePicker
