import { TextLogo } from '@/components/ApplicationLogo'
import { Center } from '@mantine/core'

const AuthCard = ({ children }) => (
  <>
    <Center mt={45} mb={40}>
      <TextLogo size="xl" weight={500} />
    </Center>

    {children}
  </>
)

export default AuthCard
