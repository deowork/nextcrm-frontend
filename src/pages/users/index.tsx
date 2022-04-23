import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Table,
  Group,
  Text,
  ActionIcon,
  Skeleton,
  ScrollArea,
} from '@mantine/core'
import { Pencil, Trash } from 'tabler-icons-react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import useSWR from 'swr'
import PopoverCard from '@/components/UserCard/PopoverCard'

interface UsersTableProps {
  data: {
    name: string
    email: string
    phone: string
  }[]
}

const usersEndpoint = '/api/users'
const getData = async () => {
  const response = await axios(usersEndpoint)
  return response.data
}

const UsersTable = ({ data }: UsersTableProps) => {
  const { t } = useTranslation('crm')
  const { data: users, error } = useSWR(usersEndpoint, getData)

  const rows = users?.map(item => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <PopoverCard {...item} />
        </Group>
      </td>
      <td>
        <Text size="sm">{item.email}</Text>
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

  const content = !users ? (
    <>
      <Group>
        <Skeleton height={8} width="8%" mr="15%" radius="xl" />
        <Skeleton height={8} ml={36} width="8%" mr="18%" radius="xl" />
        <Skeleton height={8} width="6%" radius="xl" />
      </Group>
      <Skeleton mt={20} mb={20} height={1} mr="10%" />
      <Group>
        <Skeleton height={30} width="10%" circle />
        <Skeleton height={8} width="12%" mr="10%" radius="xl" />
        <Skeleton height={8} width="18%" mr="8%" radius="xl" />
        <Skeleton height={8} width="18%" radius="xl" />
        <Skeleton height={8} width="8%" ml="auto" radius="xl" />
      </Group>
    </>
  ) : error ? (
    error.message
  ) : (
    <Table sx={{ minWidth: 800 }} verticalSpacing="md">
      <thead>
        <tr>
          <th>{t('User')}</th>
          <th>{t('Email')}</th>
          <th>{t('Phone')}</th>
          <th />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )

  return (
    <AppLayout header={<h2>{t('Users')}</h2>}>
      <ScrollArea>{content}</ScrollArea>
    </AppLayout>
  )
}

export default UsersTable

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
