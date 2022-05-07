import React from 'react'
import { createStyles, Text, Card, RingProgress, Group } from '@mantine/core'

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 1,
  },

  inner: {
    display: 'flex',

    [theme.fn.smallerThan(350)]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan(350)]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}))

interface StatsRingCardProps {
  data: {
    title: string
    completed: number
    label?: string
    total: number
    stats: {
      value: number
      label: string
    }[]
  }
}

export const ProgressCard = ({ data }: StatsRingCardProps) => {
  const { classes, theme } = useStyles()
  const items = data.stats.map(stat => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ))

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="lg" className={classes.label}>
            {data.title}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {data.completed}
            </Text>
            <Text size="xs" color="dimmed">
              {data.label}
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: (data.completed / data.total) * 100,
                color: theme.primaryColor,
              },
            ]}
            label={
              <div>
                <Text
                  align="center"
                  size="lg"
                  className={classes.label}
                  sx={{ fontSize: 22 }}>
                  {((data.completed / data.total) * 100).toFixed(0)}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  {data.label}
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  )
}
