import React, { useState } from 'react'
import { Anchor, Popover } from '@mantine/core'
import { UserCard } from '@/components/UserCard/UserCard'

export default function PopoverCard(user) {
  const [opened, setOpened] = useState(false)
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Anchor<'a'> size="sm" href="#" onClick={() => setOpened(o => !o)}>
          {user.name}
        </Anchor>
      }
      width={320}
      position="bottom"
      withArrow>
      <div style={{ display: 'flex' }}>
        <UserCard {...user} />
      </div>
    </Popover>
  )
}
