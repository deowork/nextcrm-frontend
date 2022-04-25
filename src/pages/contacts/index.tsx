import React, { useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { TableSort } from '@/components/SortTable'
import { Group, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SplitButton } from '@/components/Buttons/SplitButton'
import { SearchInput } from '@/components/Inputs/SearchInput'
import { UserPlus, ClipboardPlus } from 'tabler-icons-react'

const contactsEndpoint = '/api/contacts'

const getContacts = async () => {
  const response = await axios(contactsEndpoint)
  return response.data
}

const ContactsTable = () => {
  const theme = useMantineTheme()
  const { t } = useTranslation('crm')
  const { data, error } = useSWR(contactsEndpoint, getContacts)
  const [search, setSearch] = useState('')

  const controlButton = {
    name: t('Create lead', { ns: 'actions' }),
    menu: [
      {
        name: t('Client', { ns: 'actions' }),
        hotkey: 'Ctrl + A',
        icon: <UserPlus size={16} color={theme.colors.blue[4]} />,
      },
      {
        name: t('Order', { ns: 'actions' }),
        hotkey: 'Ctrl + Q',
        icon: <ClipboardPlus size={16} color={theme.colors.blue[4]} />,
      },
    ],
  }

  return (
    <AppLayout header={<h2>{t('Contacts')}</h2>}>
      {data ? (
        <>
          <Group spacing="lg" mb="md">
            <SearchInput search={search} setSearch={setSearch} />
            <SplitButton controlButton={controlButton} />
          </Group>
          <TableSort search={search} data={data?.data} />
        </>
      ) : !error ? (
        <div>
          <Group mb={32}>
            <Skeleton height={30} width="25%" mr="1%" radius="sm" />
            <Skeleton height={30} width="16%" radius="sm" />
          </Group>
          <Group>
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" radius="xl" />
          </Group>
          <Skeleton mt={20} mb={20} height={1} mr="10%" />
          <Group>
            <Skeleton height={8} width="10%" mr="4%" radius="xl" />
            <Skeleton height={8} width="10%" mr="4%" radius="xl" />
            <Skeleton height={8} width="10%" mr="4%" radius="xl" />
            <Skeleton height={8} width="10%" mr="4%" radius="xl" />
            <Skeleton height={8} width="10%" mr="4%" radius="xl" />
            <Skeleton height={8} width="12%" radius="xl" />
          </Group>
          <Skeleton mt={20} mb={20} height={1} mr="10%" />
          <Group>
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" mr="8%" radius="xl" />
            <Skeleton height={8} width="6%" radius="xl" />
          </Group>
        </div>
      ) : (
        <Text size="sm" color="dimmed">
          {error ? t(error.message) : t('Failed to extract contacts')}
        </Text>
      )}
    </AppLayout>
  )
}

export default ContactsTable

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm', 'actions'])),
  },
})
