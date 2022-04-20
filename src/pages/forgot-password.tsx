import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Center,
  Paper,
  PaperProps,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { At } from 'tabler-icons-react'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import AuthCard from '@/components/AuthCard'
import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import GuestLayout from '@/components/Layouts/GuestLayout'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ForgotPassword = (props: PaperProps<'div'>) => {
  const router = useRouter()

  const { forgotPassword } = useAuth({ middleware: 'guest' })

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleSubmit = async ({ email }) => {
    await forgotPassword({ setErrors, setStatus, email })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Center mt={30}>
            <Link href="/">
              <a>
                <ApplicationLogo width="80" height="80" fill="#ef3b2d" />
              </a>
            </Link>
          </Center>
        }>
        <Paper
          radius="md"
          p="xl"
          sx={{ maxWidth: 500 }}
          mx="auto"
          mt={30}
          withBorder
          {...props}>
          <Box sx={{ maxWidth: 300 }} mx="auto">
            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            {/* Validation Errors */}
            <AuthValidationErrors className="mb-4" errors={errors} />

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                required
                autoFocus
                icon={<At />}
                label="Email"
                id="email"
                type="email"
                value={email}
                placeholder="your@email.com"
                onChange={event => setEmail(event.target.value)}
                error={form.errors.email && 'Invalid email'}
                {...form.getInputProps('email')}
              />

              <Group position="right" mt="md">
                <Button type="submit">Email Password Reset Link</Button>
              </Group>
            </form>
          </Box>
        </Paper>
      </AuthCard>
    </GuestLayout>
  )
}

export default ForgotPassword

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
