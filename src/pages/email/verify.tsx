import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import {
  createStyles,
  Container,
  Button,
  Alert,
  Group,
  Title,
  Paper,
  Text,
} from '@mantine/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { MailFast } from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 700,
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

const VerifyEmail = () => {
  const { classes } = useStyles()
  const { t } = useTranslation('common')

  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
  })

  const [status, setStatus] = useState(null)

  return (
    <GuestLayout>
      <Container size={560} my={30}>
        <Paper withBorder shadow="md" p={30} radius="md" mt={80}>
          <Title className={classes.title} mb="sm">
            {t('Thanks for signing up')}!
          </Title>

          <Text>
            {t(
              'Before getting started, could you verify your email address ' +
                'by clicking on the link we just emailed to you?',
            )}{' '}
            {t(
              "If you didn't receive the email, we will gladly send you another",
            )}
          </Text>

          <Group position="apart" mt="lg" className={classes.controls}>
            <Button variant="default" onClick={logout}>
              {t('Logout')}
            </Button>

            <Button onClick={() => resendEmailVerification({ setStatus })}>
              {t('Resend verification email')}
            </Button>
          </Group>
        </Paper>

        {status === 'verification-link-sent' && (
          <Alert
            icon={<MailFast size={24} />}
            title={t('Success')}
            color="green"
            variant="filled"
            radius="md"
            mt={20}>
            {t(
              'A new verification link has been sent to the email address you ' +
                'provided during registration',
            )}
          </Alert>
        )}
      </Container>
    </GuestLayout>
  )
}

export default VerifyEmail

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'crm'])),
  },
})
