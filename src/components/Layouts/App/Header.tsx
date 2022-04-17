import React from 'react'
import { useMantineTheme } from '@mantine/core'
import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  Group,
} from '@mantine/core'
import { ColorSchemeToggle } from '@/components/ColorScheme'
import { TextLogo } from '@/components/ApplicationLogo'

const Header = ({ opened, disclosure, height = 70 }) => {
  const theme = useMantineTheme()

  return (
    <MantineHeader height={height} p="md">
      <Group sx={{ height: '100%' }} position="apart">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={disclosure.toggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <TextLogo />
        <ColorSchemeToggle />
      </Group>
    </MantineHeader>
  )
}

export default Header
