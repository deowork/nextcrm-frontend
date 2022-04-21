import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { ArrowLeft, Lock } from 'tabler-icons-react'
import { useForm } from '@mantine/form'
import { PasswordStrength } from '@/components/PasswordStrengthMeter'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import GuestLayout from '@/components/Layouts/GuestLayout'

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },

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
}

const PasswordReset = (props: PaperProps<'div'>) => {
  const router = useRouter()
  const { classes } = useStyles()
  const { t } = useTranslation('common')
  const { resetPassword } = useAuth({ middleware: 'guest' })

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : t('Invalid email')),
      password_confirmation: (value, values) =>
        value !== values.password ? t('Passwords did not match') : null,
    },
  })

  const handleSubmit = async (props: FormValues) => {
    await resetPassword({
      setErrors,
      setStatus,
      ...props,
    })
  }

  useEffect(() => {
    form.setFieldValue(
      'email',
      !Array.isArray(router.query.email) ? router.query.email : '',
    )
  }, [router.query.email])

  return (
    <GuestLayout>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          {t('Reset password')}
        </Title>
        <Text color="dimmed" size="sm" align="center">
          {t('Get a new password for your account')}
        </Text>

        <Paper
          radius="md"
          p="xl"
          sx={{ maxWidth: 500 }}
          mx="auto"
          shadow="md"
          mt={30}
          withBorder
          {...props}>
          <AuthSessionStatus status={status} />

          <AuthValidationErrors errors={errors} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group direction="column" grow>
              <TextInput
                required
                autoFocus
                label={t('Your email')}
                placeholder="your@email.com"
                onChange={event =>
                  form.setFieldValue('email', event.target.value)
                }
                error={form.errors.email && t('Invalid email')}
                {...form.getInputProps('email')}
              />

              <PasswordStrength
                required
                popover={false}
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
            </Group>

            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor
                color="dimmed"
                size="sm"
                className={classes.control}
                href={'/login'}
                component={Link}>
                <Center inline>
                  <ArrowLeft size={12} />
                  <Box ml={5}>
                    <a className={classes.link}>{t('Back to login page')}</a>
                  </Box>
                </Center>
              </Anchor>
              <Button className={classes.control} type="submit">
                {t('Reset password')}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </GuestLayout>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default PasswordReset
