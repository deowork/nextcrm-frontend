import { useForm, formList } from '@mantine/form'
import {
  ActionIcon,
  TextInput,
  Button,
  Group,
  Text,
  Code,
  Box,
} from '@mantine/core'
import { Trash } from 'tabler-icons-react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const ContactsCreate = () => {
  const { t } = useTranslation('crm')

  const form = useForm({
    initialValues: {
      emails: formList([{ email: '' }]),
    },
  })

  const fields = form.values.emails.map((_, index) => (
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
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ))

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            {t('Email')}
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          Mail missing...
        </Text>
      )}

      {fields}

      <Group mt="md">
        <Button onClick={() => form.addListItem('emails', { email: '' })}>
          Add email
        </Button>
      </Group>

      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </Box>
  )
}

export default ContactsCreate

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
