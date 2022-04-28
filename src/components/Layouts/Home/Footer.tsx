import React from 'react'
import { createStyles, Container, Group, ActionIcon } from '@mantine/core'
import {
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
  BrandGithub,
} from 'tabler-icons-react'
import { TextLogo } from '@/components/ApplicationLogo'
import { MarkGithubIcon } from '@primer/octicons-react'
import { LanguagePicker } from '@/components/LanguagePicker'

const useStyles = createStyles(theme => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))

export function FooterSocial({ user = false }) {
  const { classes } = useStyles()

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <TextLogo href={user ? '/dashboard' : '/'} />
        <Group spacing={3} position="right" noWrap>
          <LanguagePicker />
        </Group>
      </Container>
    </div>
  )
}
