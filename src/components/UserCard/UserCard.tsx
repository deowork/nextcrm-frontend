import React from 'react'
import { Group, Avatar, Text, createStyles } from '@mantine/core'
import { At, ChevronRight, PhoneCall } from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

interface UserButtonProps {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

export function UserCard(user: UserButtonProps) {
  const { classes } = useStyles()

  return (
    <div>
      <Group noWrap>
        <Avatar src="" size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: 'uppercase' }}
            weight={700}
            color="dimmed">
            Software engineer
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {user.name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <At size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {user.email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <PhoneCall size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              +380999999999
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  )
}
