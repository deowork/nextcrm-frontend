import React from 'react'
import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core'
import {
  PresentationAnalytics,
  ArrowDownRight,
  ArrowUpRight,
  UserPlus,
  Coin,
} from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
}))

const icons = {
  coin: Coin,
  orders: PresentationAnalytics,
  user: UserPlus,
}

interface StatsGridProps {
  data: {
    title: string
    icon: string
    value: string
    diff: number
  }[]
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  const { t } = useTranslation('crm')
  const { classes } = useStyles()
  const stats = data.map(stat => {
    const Icon = icons[stat.icon]
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={15}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="sm"
            weight={500}
            className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          {t('Compared to previous month')}
        </Text>
      </Paper>
    )
  })
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'xs', cols: 1 },
      ]}>
      {stats}
    </SimpleGrid>
  )
}
