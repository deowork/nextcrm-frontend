import { useEffect, useState } from 'react'
import { TextLogo } from '@/components/ApplicationLogo'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { useForm } from '@mantine/form'
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
import { At, Lock } from 'tabler-icons-react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useToggle, upperFirst } from '@mantine/hooks'
import { FooterSocial } from '@/components/Layouts/Home/Footer'
import { PasswordStrength } from '@/components/PasswordStrengthMeter'

const useStyles = createStyles(theme => ({
  link: {
    color: '#adb5bd',
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}))

interface FormValues {
  name: string
  email: string
  password: string
  password_confirmation: string
  remember: boolean
}

const Login = (props: PaperProps<'div'>) => {
  const router = useRouter()
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const [type, toggle] = useToggle('login', ['login', 'register'])

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      remember: false,
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const { login, register } = useAuth({
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
    type === 'register'
      ? await register({ setErrors, ...values })
      : await login({ setStatus, setErrors, ...values })
  }

  return (
    <GuestLayout>
      <Center mt={45}>
        <TextLogo size="xl" weight={500} />
      </Center>

      <Paper
        radius="md"
        p="xl"
        sx={{ maxWidth: 500 }}
        mx="auto"
        mt={40}
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
            {type === 'register' && (
              <TextInput
                autoFocus
                label={t('Name')}
                placeholder={t('Name')}
                {...form.getInputProps('name')}
              />
            )}

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

            {type === 'register' ? (
              <>
                <PasswordStrength
                  required
                  id="password"
                  label={t('Password')}
                  placeholder={t('Your password')}
                  autoComplete="new-password"
                  icon={<Lock size={16} />}
                  {...form.getInputProps('password')}
                />

                <PasswordInput
                  required
                  id="password_confirmation"
                  label={t('Confirm password')}
                  placeholder={t('Confirm password')}
                  icon={<Lock size={16} />}
                  {...form.getInputProps('password_confirmation')}
                />
              </>
            ) : (
              <PasswordInput
                required
                label={t('Password')}
                id="password"
                placeholder={t('Your password')}
                icon={<Lock size={16} />}
                {...form.getInputProps('password')}
              />
            )}

            {type === 'login' && (
              <Checkbox
                mt="md"
                id="remember_me"
                name="remember"
                label={t('Remember me')}
                {...form.getInputProps('remember', { type: 'checkbox' })}
              />
            )}
          </Group>

          <Group position="apart" mt="xl">
            <Group>
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={() => toggle()}
                size="xs">
                {type === 'register' ? t('Login') : t('Register')}
              </Anchor>
              <Link href="/password/forgot" passHref>
                <Anchor
                  type="button"
                  color="gray"
                  size="xs"
                  className={classes.link}>
                  {t('Forgot your password?')}
                </Anchor>
              </Link>
            </Group>
            <Button type="submit">{t(upperFirst(type))}</Button>
          </Group>
        </form>
      </Paper>
      <FooterSocial user={false} />
    </GuestLayout>
  )
}

export default Login

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
