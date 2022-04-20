import React from 'react'
import { createStyles, Navbar, ScrollArea } from '@mantine/core'
import NavLink from '@/components/NavLink'

const useStyles = createStyles(theme => ({
  section: {
    margin: theme.spacing.sm,
  },
}))

const Navigation = ({ links, opened, width }) => {
  const { classes } = useStyles()

  links = links.map(link => <NavLink link={link} key={link.link} />)

  return (
    <Navbar hidden={!opened} width={width}>
      <Navbar.Section className={classes.section} grow component={ScrollArea}>
        {links}
      </Navbar.Section>
    </Navbar>
  )
}

export default Navigation
