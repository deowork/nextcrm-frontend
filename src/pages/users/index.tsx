import React from 'react'
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
} from '@mantine/core'
import { Pencil, Trash } from 'tabler-icons-react'
import AppLayout from '@/components/Layouts/AppLayout'

interface UsersTableProps {
  data: {
    avatar: string
    name: string
    job: string
    email: string
    phone: string
  }[]
}

export async function getStaticProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return {
    props: {
      users: data,
    },
  }
}

export default function UsersTable({ users }, { data }: UsersTableProps) {
  const rows = users.map(item => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Text size="sm" weight={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Anchor<'a'>
          size="sm"
          href="#"
          onClick={event => event.preventDefault()}>
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="gray">
          {item.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon color="red">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ))

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Users
        </h2>
      }>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </AppLayout>
  )
}
