import React, { useState } from 'react'
import { Button, Group, Paper, TextInput } from '@mantine/core'
import { At } from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'
import { useForm } from '@mantine/form'
import axios from '@/lib/axios'
import { log } from 'util'
import { name } from 'next/dist/telemetry/ci-info'

interface FormValues {
  name: string
  email: string
}

export default function UserEditForm({ onModal, user }) {
  const { t } = useTranslation('common')
  const form = useForm<FormValues>({
    initialValues: {
      name: user.name,
      email: user.email,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = async (values: FormValues) => {
    //console.log(values)
    await axios
      .put('/api/users/' + user.id, {
        name: values.name,
        email: values.email,
      })
      .then(response => console.log(response.data))
      .then(onModal())
      .catch(error => console.log(error))
  }

  return (
    <Paper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction="column" grow>
          <TextInput
            autoFocus
            label={t('Name')}
            placeholder={t('Name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            autoFocus
            icon={<At size={16} />}
            label={t('Email')}
            id="email"
            type="email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
        </Group>

        <Group position="apart" mt="xl">
          <Button type="submit">Edit</Button>
        </Group>
      </form>
    </Paper>
  )
}
