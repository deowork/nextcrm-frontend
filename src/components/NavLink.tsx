import Link from 'next/link'
import { createStyles, UnstyledButton, Badge } from '@mantine/core'
import React from 'react'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 400,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: 'none',
  },
}))

const NavLink = ({ link }) => {
  const { t } = useTranslation('crm')
  const { classes } = useStyles()

  return (
    <Link href={link?.link ?? '/'}>
      <UnstyledButton key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} />
          <span>{t(link.label)}</span>
        </div>
        {link.notifications && (
          <Badge size="xs" variant="outline" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    </Link>
  )
}

export default NavLink
