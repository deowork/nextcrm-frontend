import React, { useState } from 'react'
import { useOs } from '@mantine/hooks'
import { createStyles, Kbd, TextInput } from '@mantine/core'
import { Search } from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'
import {
  useClickOutside,
  useFocusTrap,
  useHotkeys,
  useMergedRef,
} from '@mantine/hooks'

const useStyles = createStyles(theme => ({
  kbd: {
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',

    span: {
      margin: '0 3px',
    },
  },

  kbdKey: {
    padding: '6px 6px',
    fontSize: 10,
    fontWeight: 500,
    borderBottomWidth: 1,
    lineHeight: 1,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
  },
}))

export function SearchInput({ search, setSearch }) {
  const os = useOs()
  const { classes } = useStyles()
  const { t } = useTranslation('crm')

  const [searchFocus, setSearchFocus] = useState(false)
  const searchRef = useFocusTrap(searchFocus)
  const useClickOutsideRef = useClickOutside(() => {
    setSearchFocus(false)
  })
  const searchMergedRef = useMergedRef(searchRef, useClickOutsideRef)

  useHotkeys([
    [
      'ctrl+K',
      () => {
        setSearchFocus(!searchFocus)
      },
    ],
  ])

  const rightSection = (
    <div className={classes.kbd}>
      <Kbd className={classes.kbdKey}>{os === 'macos' ? '⌘' : 'Ctrl'}</Kbd>
      <span>+</span>
      <Kbd className={classes.kbdKey}>K</Kbd>
    </div>
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
  }

  return (
    <TextInput
      placeholder={t('Search')}
      icon={<Search size={14} />}
      value={search}
      rightSectionWidth={95}
      rightSection={rightSection}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      onChange={handleSearchChange}
      ref={searchMergedRef}
    />
  )
}
