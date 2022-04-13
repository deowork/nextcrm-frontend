import React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { GoogleIcon } from './GoogleIcon'
import { MarkGithubIcon } from '@primer/octicons-react'

export function GoogleButton(props: ButtonProps<'button'>) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  )
}

export function GithubButton(props: ButtonProps<'button'>) {
  return (
    <Button
      {...props}
      leftIcon={<MarkGithubIcon />}
      sx={theme => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  )
}
