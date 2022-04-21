import { useForm } from '@mantine/form'
import {
  PasswordInput,
  Group,
  Button,
  Center,
  Paper,
  Text,
  Divider,
  PaperProps,
  TextInput,
  Checkbox,
  Anchor,
} from '@mantine/core'
import AuthCard from '@/components/AuthCard'
import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import {
  GithubButton,
  GoogleButton,
} from '@/components/SocialButtons/SocialButtons'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { At, Lock } from 'tabler-icons-react'
import { createStyles } from '@mantine/core'
import { PasswordStrength } from '@/components/PasswordStrengthMeter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles((theme, _params, getRef) => ({
  link: {
    color: '#adb5bd',
    fontSize: '12px',
    textAlign: 'left',
    textDecoration: 'none',
  },
}))

interface FormValues {
  name: string
  email: string
  password: string
  password_confirmation: string
  remember: boolean
}

const Register = (props: PaperProps<'div'>) => {
  const { t } = useTranslation('common')
  const { classes } = useStyles()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      remember: false,
    },

    validate: {
      password_confirmation: (value, values) =>
        value !== values.password ? t('Passwords did not match') : null,
    },
  })

  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [errors, setErrors] = useState([])

  const submitForm = async (props: FormValues) => {
    await register({ setErrors, ...props })
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

          <AuthValidationErrors mb={15} errors={errors} />

          <form onSubmit={form.onSubmit(submitForm)}>
            <Group direction="column" grow>
              <TextInput
                autoFocus
                label={t('Name')}
                placeholder={t('Name')}
                {...form.getInputProps('name')}
              />

              <TextInput
                required
                label={t('Email')}
                id="email"
                type="email"
                placeholder="your@email.com"
                icon={<At size={16} />}
                value={form.values.email}
                onChange={event =>
                  form.setFieldValue('email', event.currentTarget.value)
                }
                error={form.errors.email && t('Invalid email')}
                {...form.getInputProps('email')}
              />

              <PasswordStrength
                required
                label={t('Password')}
                id="password"
                placeholder={t('Password')}
                autoComplete="new-password"
                onChange={password => form.setFieldValue('password', password)}
                icon={<Lock size={16} />}
                {...form.getInputProps('password')}
              />

              <PasswordInput
                required
                id="password_confirmation"
                label={t('Confirm password')}
                placeholder={t('Confirm password')}
                icon={<Lock size={16} />}
                onChange={event =>
                  form.setFieldValue(
                    'password_confirmation',
                    event.currentTarget.value,
                  )
                }
                {...form.getInputProps('password_confirmation')}
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
              <Anchor component={Link} href="/login">
                <a className={classes.link}>{t('Already registered')}?</a>
              </Anchor>
              <Button type="submit">{t('Register')}</Button>
            </Group>
          </form>
        </Paper>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
