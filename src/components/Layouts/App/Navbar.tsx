import React from 'react'
import { createStyles, Navbar as CoreNavbar, ScrollArea } from '@mantine/core'
import NavLink from '@/components/NavLink'

const useStyles = createStyles(theme => ({
  section: {
    margin: theme.spacing.sm,
  },
}))

const Navbar = ({ links, opened, width }) => {
  const { classes } = useStyles()

  links = links.map(link => <NavLink link={link} key={link.link} />)

  return (
    <CoreNavbar hidden={!opened} width={width}>
      <CoreNavbar.Section
        grow
        className={classes.section}
        component={ScrollArea}>
        {links}
      </CoreNavbar.Section>
    </CoreNavbar>
  )
}

export default Navbar
