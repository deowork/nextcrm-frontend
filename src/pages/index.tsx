import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { Group, Button } from '@mantine/core'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <>
      <Head>
        <title>Main Page | NextCRM</title>
      </Head>

      <Group mt={10} ml={10}>
        {user ? (
          <Link href="/dashboard" passHref>
            <Button component="a" variant="outline">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button component="a" variant="outline">
                Login
              </Button>
            </Link>

            <Link href="/register" passHref>
              <Button component="a" variant="outline">
                Register
              </Button>
            </Link>
          </>
        )}
      </Group>
    </>
  )
}
