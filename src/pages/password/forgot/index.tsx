import {
  TextInput,
  Text,
  Button,
  Group,
  Box,
  Center,
  Paper,
  Anchor,
  createStyles,
  Container,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { ArrowLeft } from 'tabler-icons-react'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import GuestLayout from '@/components/Layouts/GuestLayout'
import AuthSessionStatus from '@/components/Auth/AuthSessionStatus'
import AuthValidationErrors from '@/components/Auth/AuthValidationErrors'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { z as zod } from 'zod'

const schema = zod.object({
  email: zod.string().email({ message: 'Invalid email' }),
})

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
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

const ForgotPassword = () => {
  const { classes } = useStyles()
  const { t } = useTranslation('common')

  const { forgotPassword } = useAuth({ middleware: 'guest' })

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
    },
  })

  const handleSubmit = async ({ email }) => {
    setLoading(true)
    await forgotPassword({ setErrors, setStatus, email })
  }

  useEffect(() => {
    if (errors.length > 0) {
      setLoading(false)
    }
  }, [errors, status])

  return (
    <GuestLayout>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          {t('Forgot your password?')}
        </Title>
        <Text color="dimmed" size="sm" align="center">
          {t('Enter your email to get a reset link')}
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <AuthSessionStatus mb={10} status={status} />

          <AuthValidationErrors mb={10} errors={errors} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              autoFocus
              label={t('Your email')}
              placeholder="your@email.com"
              onChange={event =>
                form.setFieldValue('email', event.target.value)
              }
              error={form.errors.email && 'Invalid email'}
              {...form.getInputProps('email')}
            />
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
              <Button
                loading={loading}
                className={classes.control}
                type="submit">
                {t('Reset password')}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </GuestLayout>
  )
}

export default ForgotPassword

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
