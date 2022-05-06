import { useEffect, useState } from 'react'
import AuthSessionStatus from '@/components/Auth/AuthSessionStatus'
import AuthValidationErrors from '@/components/Auth/AuthValidationErrors'
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
  Divider,
  Anchor,
  Group,
  createStyles,
} from '@mantine/core'
import { GoogleButton, GithubButton } from '@/components/Buttons/Social'
import { At, Lock } from 'tabler-icons-react'
import { useTranslation } from 'next-i18next'
import { useToggle, upperFirst } from '@mantine/hooks'
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

const AuthForm = ({ initForm = 'login', switchToggle = true, ...props }) => {
  const router = useRouter()
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const [type, toggle] = useToggle(initForm, ['login', 'register'])
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    type === 'register'
      ? await register({ setErrors, ...values })
      : await login({ setStatus, setErrors, ...values })
  }

  useEffect(() => {
    if (errors.length > 0) {
      setLoading(false)
    }
  }, [errors, status])

  return (
    <Paper {...props}>
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
            <div>
              <Group position="apart" mb={5}>
                <Text
                  component="label"
                  htmlFor="password"
                  size="sm"
                  weight={500}>
                  {t('Password')}{' '}
                  <Text component="span" size="sm" color="#ff6b6b">
                    *
                  </Text>
                </Text>

                <Link href="/password/forgot" passHref>
                  <Anchor<'a'>
                    sx={theme => ({
                      color:
                        theme.colors[theme.primaryColor][
                          theme.colorScheme === 'dark' ? 4 : 6
                        ],
                      fontWeight: 500,
                      fontSize: theme.fontSizes.xs,
                    })}>
                    {t('Forgot your password?')}
                  </Anchor>
                </Link>
              </Group>
              <PasswordInput
                required
                id="password"
                placeholder={t('Your password')}
                icon={<Lock size={16} />}
                {...form.getInputProps('password')}
              />
            </div>
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
              onClick={() => {
                switchToggle
                  ? toggle()
                  : router.push(`/${type === 'login' ? 'register' : 'login'}`)
              }}
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
          <Button type="submit" loading={loading}>
            {t(upperFirst(type))}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}

export default AuthForm
