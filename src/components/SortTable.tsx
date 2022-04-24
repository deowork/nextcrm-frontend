import React, { useState } from 'react'
import { useOs } from '@mantine/hooks'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Highlight,
  Avatar,
  Kbd,
  Badge,
} from '@mantine/core'
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'
import {
  useClickOutside,
  useFocusTrap,
  useHotkeys,
  useMergedRef,
} from '@mantine/hooks'

const useStyles = createStyles(theme => ({
  th: {
    padding: '0 !important',
  },

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

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}))

interface RowData {
  id: number
  name: string
  company: string
  email: string
  phone: string
  status: string
}

interface TableSortProps {
  data: RowData[]
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

const statusColor = {
  lead: 'gray',
  client: 'green',
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: RowData[], search: string) {
  const keys = data.length ? Object.keys(data[0]) : []
  const query = search.toLowerCase().trim()
  return data.filter(item =>
    keys.some(key => stringifySort(item[key]).toLowerCase().includes(query)),
  )
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData; reversed: boolean; search: string },
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      const aa = (payload.reversed ? b : a)[payload.sortBy],
        bb = (payload.reversed ? a : b)[payload.sortBy],
        options = { numeric: !Number.isNaN(aa) && !Number.isNaN(bb) }

      return stringifySort(aa).localeCompare(
        stringifySort(bb),
        undefined,
        options,
      )
    }),
    payload.search,
  )
}

export function TableSort({ data }: TableSortProps) {
  const os = useOs()
  const { classes } = useStyles()
  const { t } = useTranslation('crm')
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

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

  const setSorting = field => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    )
  }

  const sortColumns = {
    id: {},
    name: {},
    company: {},
    email: {},
    phone: {},
    status: {},
  }

  const sortKeys = Object.keys(sortColumns),
    columnsCount = sortKeys.length

  const titles = (
    <tr>
      {sortKeys.map(column => (
        <Th
          sorted={sortBy === column}
          reversed={reverseSortDirection}
          onSort={() => setSorting(column)}>
          {t(
            sortColumns[column]?.name
              ? sortColumns[column].name
              : capitalizeFirstLetter(column),
          )}
        </Th>
      ))}
    </tr>
  )

  const rows = sortedData.map(row => (
    <tr key={row.id}>
      <Highlight component="td" highlight={search}>
        {stringifySort(row.id)}
      </Highlight>
      <td>
        <Group spacing="sm">
          <Avatar size={20} radius={20} />
          <Highlight highlight={search} size="sm">
            {stringifySort(row.name)}
          </Highlight>
        </Group>
      </td>
      <Highlight component="td" highlight={search}>
        {stringifySort(row.company)}
      </Highlight>
      <td>
        {row.email && (
          <Highlight
            size="sm"
            component="a"
            variant="link"
            highlight={search}
            href={`mailto:${row.email}`}>
            {row.email}
          </Highlight>
        )}
      </td>
      <td>
        {row.phone && (
          <Highlight
            size="sm"
            component="a"
            variant="link"
            highlight={search}
            href={`tel:${row.phone}`}>
            {row.phone}
          </Highlight>
        )}
      </td>
      <td>
        <Badge size="sm" color={statusColor[row.status]} fullWidth>
          <Highlight style={{ fontSize: 11, lineHeight: 1 }} highlight={search}>
            {row.status}
          </Highlight>
        </Badge>
      </td>
    </tr>
  ))

  const rightSection = (
    <div className={classes.kbd}>
      <Kbd className={classes.kbdKey}>{os === 'macos' ? '⌘' : 'Ctrl'}</Kbd>
      <span>+</span>
      <Kbd className={classes.kbdKey}>K</Kbd>
    </div>
  )

  return (
    <ScrollArea>
      <Group spacing="lg" mb="md">
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
      </Group>
      <Table
        verticalSpacing="xs"
        horizontalSpacing="md"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}>
        <thead>{titles}</thead>
        <tbody>
          {rows.length ? (
            rows
          ) : (
            <tr>
              <td colSpan={columnsCount}>
                <Text size="sm" color="dimmed" align="center">
                  {t('Nothing found')}
                </Text>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>{titles}</tfoot>
      </Table>
    </ScrollArea>
  )
}

function stringifySort(item) {
  return item?.toString() || ''
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}
