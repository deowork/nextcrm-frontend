import {
  Timeline,
  Text,
  Card,
  Avatar,
  Indicator,
  createStyles,
} from '@mantine/core'
import { FileAnalytics, Coin } from 'tabler-icons-react'
import ReactTimeAgo from 'react-time-ago'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles(theme => ({
  card: {
    height: 'fit-content',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}))

export const ActionsLog = () => {
  const { t } = useTranslation('crm')
  const { locale } = useRouter()
  const { classes } = useStyles()

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Timeline bulletSize={24} lineWidth={2}>
        <Timeline.Item
          bullet={
            <Indicator
              inline
              size={10}
              offset={2}
              position="bottom-end"
              color="teal"
              withBorder>
              <Avatar
                size={22}
                radius="xl"
                src="https://i.pravatar.cc/300?img=5"
              />
            </Indicator>
          }
          lineVariant="dashed"
          title={
            <>
              <Text variant="link" component="span" inherit>
                Anna
              </Text>{' '}
              {t('assigned to')}{' '}
              <Text variant="link" component="span" inherit>
                John Doe
              </Text>
            </>
          }>
          <Text color="dimmed" size="sm">
            {t('Manager assigned to contact')}
          </Text>
          <Text size="xs" mt={4}>
            <ReactTimeAgo
              date={Date.now() - 40 * 1000}
              locale={locale}
              timeStyle="round"
            />
          </Text>
        </Timeline.Item>

        <Timeline.Item
          bullet={
            <Avatar size={22} radius="xl">
              JD
            </Avatar>
          }
          lineVariant="dashed"
          title={t('New client')}>
          <Text color="dimmed" size="sm">
            {t('Created from')}{' '}
            <Text variant="link" component="span" inherit>
              {t('contact')}
            </Text>
          </Text>
          <Text size="xs" mt={4}>
            <ReactTimeAgo
              date={Date.now() - 16 * 60 * 1000}
              locale={locale}
              timeStyle="round"
            />
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title={t('New order')}
          bullet={<FileAnalytics size={12} />}
          lineVariant="dashed">
          <Text color="dimmed" size="sm">
            {t('Created from')}{' '}
            <Text variant="link" component="span" inherit>
              {t('lead')}
            </Text>
          </Text>
          <Text size="xs" mt={4}>
            <ReactTimeAgo
              date={Date.now() - 4 * 60 * 60 * 1000}
              locale={locale}
              timeStyle="round"
            />
          </Text>
        </Timeline.Item>

        <Timeline.Item title={t('New lead')}>
          <Text color="dimmed" size="sm">
            {t('Created by API')}
          </Text>
          <Text size="xs" mt={4}>
            <ReactTimeAgo
              date={Date.now() - 24 * 60 * 60 * 1000}
              locale={locale}
              timeStyle="round"
            />
          </Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  )
}
