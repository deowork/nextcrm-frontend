import GuestLayout from '@/components/Layouts/GuestLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FooterSocial } from '@/components/Layouts/Home/Footer'
import AuthCard from '@/components/Auth/AuthCard'
import AuthForm from '@/components/Auth/AuthForm'

const Login = () => (
  <GuestLayout>
    <AuthCard>
      <AuthForm
        initForm="login"
        switchToggle={false}
        radius="md"
        p="xl"
        sx={{ maxWidth: 500 }}
        mx="auto"
        withBorder
      />
    </AuthCard>

    <FooterSocial />
  </GuestLayout>
)

export default Login

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
