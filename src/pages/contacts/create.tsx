import React from 'react'
import { z as zod } from 'zod'
import { useForm, zodResolver, formList } from '@mantine/form'
import {
  InputWrapper,
  ActionIcon,
  SimpleGrid,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Box,
} from '@mantine/core'
import { Plus, X } from 'tabler-icons-react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import AppLayout from '@/components/Layouts/AppLayout'

const schema = zod.object({
  name: zod.string().min(2, { message: 'Name should have at least 2 letters' }),
  company: zod
    .string()
    .min(2, { message: 'Company name should have at least 2 letters' }),
  emails: zod.array(
    zod.object({ email: zod.string().email({ message: 'Invalid email' }) }),
  ),
  phones: zod.array(zod.object({ phone: zod.string() })),
  status: zod.enum(['lead', 'client']),
})

const ContactsCreate = () => {
  const { t } = useTranslation('crm')

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      company: '',
      emails: formList([{ email: '' }]),
      phones: formList([{ phone: '' }]),
      status: 'lead',
    },
  })

  return (
    <AppLayout header={<h2>{t('Create contact')}</h2>}>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <Box sx={{ maxWidth: 600, spacing: 30 }}>
          <SimpleGrid cols={2}>
            <TextInput
              required
              mb="sm"
              label={t('Full name')}
              placeholder={t('Full name')}
              {...form.getInputProps('name')}
            />
            <Select
              label={t('Status')}
              placeholder={t('Status')}
              data={[
                { value: 'lead', label: t('Lead') },
                { value: 'client', label: t('Client') },
              ]}
              {...form.getInputProps('status')}
            />
          </SimpleGrid>

          <TextInput
            mb="sm"
            label={t('Company')}
            placeholder={t('Company name')}
            {...form.getInputProps('company')}
          />

          <InputWrapper
            mb="sm"
            label={t('Contact emails')}
            styles={{
              description: { marginBottom: 0 },
            }}
            description={t('Add as many emails as you need')}>
            {form.values.emails.map((_, index) => (
              <Group key={index} mt="xs">
                <TextInput
                  placeholder="client@email.com"
                  required
                  sx={{ flex: 1 }}
                  {...form.getListInputProps('emails', index, 'email')}
                />
                <ActionIcon
                  color="red"
                  variant="hover"
                  onClick={() => form.removeListItem('emails', index)}>
                  <X size={16} />
                </ActionIcon>
              </Group>
            ))}

            <Button
              mt="xs"
              variant="outline"
              color="gray"
              leftIcon={<Plus size={16} />}
              onClick={() => form.addListItem('emails', { email: '' })}>
              {t('Add email', { ns: 'actions' })}
            </Button>
          </InputWrapper>

          <InputWrapper
            mb="sm"
            label={t('Contact phones')}
            styles={{
              description: { marginBottom: 0 },
            }}
            description={t(
              'Please specify country code for better compatibility',
            )}>
            {form.values.phones.map((_, index) => (
              <Group key={index} mt="xs">
                <TextInput
                  required
                  placeholder="+380500000000"
                  sx={{ flex: 1 }}
                  {...form.getListInputProps('phones', index, 'phone')}
                />
                <ActionIcon
                  color="red"
                  variant="hover"
                  onClick={() => form.removeListItem('phones', index)}>
                  <X size={16} />
                </ActionIcon>
              </Group>
            ))}

            <Button
              mt="xs"
              variant="outline"
              color="gray"
              leftIcon={<Plus size={16} />}
              onClick={() => form.addListItem('phones', { phone: '' })}>
              {t('Add phone', { ns: 'actions' })}
            </Button>
          </InputWrapper>

          <Group mt="xl">
            <Button type="submit">{t('Create', { ns: 'actions' })}</Button>
          </Group>
        </Box>
      </form>
    </AppLayout>
  )
}

export default ContactsCreate

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm', 'actions'])),
  },
})
