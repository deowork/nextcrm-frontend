import AuthCard from '@/components/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { decode as atob } from 'base-64'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Paper,
  Text,
  Center,
  PaperProps,
  Divider,
  Anchor,
  Group,
  createStyles,
} from '@mantine/core'
import {
  GoogleButton,
  GithubButton,
} from '@/components/SocialButtons/SocialButtons'
import { At } from 'tabler-icons-react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  link: {
    color: '#adb5bd',
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}))

interface FormValues {
  email: string
  password: string
  remember: boolean
}

const Login = (props: PaperProps<'div'>) => {
  const { classes } = useStyles()
  const { t } = useTranslation('common')

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.query.reset))
    } else {
      setStatus(null)
    }
  })

  const handleSubmit = async (values: FormValues) => {
    await login({ setErrors, setStatus, ...values })
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
          <Text size="lg" weight={500}>
            {t('Welcome to')} NextCRM
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <GithubButton radius="xl">Github</GithubButton>
          </Group>

          <Divider
            label={t('Or continue with email')}
            labelPosition="center"
            my="lg"
          />

          <AuthSessionStatus mb={20} status={status} />

          <AuthValidationErrors mb={15} errors={errors} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group direction="column" grow>
              <TextInput
                required
                autoFocus
                icon={<At size={16} />}
                label={t('Email')}
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.values.email}
                onChange={event =>
                  form.setFieldValue('email', event.currentTarget.value)
                }
                error={form.errors.email && 'Invalid email'}
                {...form.getInputProps('email')}
              />

              <PasswordInput
                required
                label={t('Password')}
                id="password"
                placeholder={t('Your password')}
                value={form.values.password}
                onChange={event =>
                  form.setFieldValue('password', event.currentTarget.value)
                }
                {...form.getInputProps('password')}
              />

              <Checkbox
                mt="md"
                id="remember_me"
                name="remember"
                label={t('Remember me')}
                {...form.getInputProps('remember', { type: 'checkbox' })}
              />
            </Group>

            <Group position="apart" mt="xl">
              <Anchor
                color="gray"
                href="/forgot-password"
                size="xs"
                component={Link}>
                <a className={classes.link}>{t('Forgot your password?')}</a>
              </Anchor>
              <Button type="submit">{t('Login')}</Button>
            </Group>
          </form>
        </Paper>
      </AuthCard>
    </GuestLayout>
  )
}

export default Login

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
