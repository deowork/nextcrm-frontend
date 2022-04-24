import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { TableSort } from '@/components/SortTable'
import { Group, Skeleton, Text } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const contactsEndpoint = '/api/contacts'

const getContacts = async () => {
  const response = await axios(contactsEndpoint)
  return response.data
}

const ContactsTable = () => {
  const { t } = useTranslation('crm')
  const { data, error } = useSWR(contactsEndpoint, getContacts)

  return (
    <AppLayout header={<h2>{t('Contacts')}</h2>}>
      {data ? (
        <TableSort data={data?.data} />
      ) : !error ? (
        <div>
          <Group>
            <Skeleton height={30} width="25%" mb={32} radius="sm" />
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
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
