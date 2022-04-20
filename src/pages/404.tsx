import React from 'react'
import Link from 'next/link'
import { Dots } from '@/components/UI/Dots'
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from '@mantine/core'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'
import { useAuth } from '@/hooks/auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  label: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 180,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.8,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const NotFoundPage = () => {
  const { t } = useTranslation('common')
  const { classes } = useStyles()
  const { user } = useAuth()

  return (
    <Container className={classes.root}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 40 }} />

      <Text className={classes.label}>404</Text>
      <Title className={classes.title}>
        {t('You have found a')}{' '}
        <Text
          inherit
          component="span"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}>
          {t('secret place')}
        </Text>
      </Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}>
        {t(
          'Unfortunately, this is only a 404 page. You may have mistyped the' +
            ' address, or the page has been moved to another URL',
        )}
      </Text>
      <Group position="center">
        <Link href="/" passHref>
          <Button
            leftIcon={<ChevronLeft size={14} />}
            component="a"
            variant="subtle"
            size="md">
            {t('Take me back to home page')}
          </Button>
        </Link>
        {user ? (
          <Link href="/dashboard" passHref>
            <Button
              rightIcon={<ChevronRight size={14} />}
              component="a"
              variant="subtle"
              size="md">
              {t('Dashboard')}
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </Group>
    </Container>
  )
}

export default NotFoundPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
