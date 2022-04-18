import React from 'react'
import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Container,
  Group,
  Grid,
  Col,
} from '@mantine/core'
import { Dots } from '@/components/UI/Dots'

const useStyles = createStyles(theme => ({
  wrapper: {
    padding: theme.spacing.sm,
    position: 'relative',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.4,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  dots: {
    position: 'absolute',
    zIndex: -1,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },
}))

export function FeaturesTitle({ features }) {
  const { classes } = useStyles()

  const items = features.map(feature => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}>
        <feature.icon size={26} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ))

  return (
    <Container className={classes.wrapper} size="xl">
      <Dots className={classes.dots} style={{ left: 55, top: 160 }} />
      <Dots className={classes.dots} style={{ left: 15, top: 40 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 40 }} />

      <Grid gutter={80} m={0}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Minimalistic modern{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit>
              CRM
            </Text>
          </Title>

          <Text color="dimmed" mt="md">
            The perfect solution for start-up business
          </Text>

          <Group>
            <Button
              mt="xl"
              radius="md"
              size="md"
              variant="gradient"
              gradient={{ deg: 125, from: 'blue', to: 'cyan' }}>
              Get started
            </Button>
            <Button mt="xl" radius="md" size="md" variant="default">
              Contact us
            </Button>
          </Group>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid
            cols={2}
            spacing={30}
            breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </Container>
  )
}
