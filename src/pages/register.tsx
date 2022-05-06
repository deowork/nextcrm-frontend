import GuestLayout from '@/components/Layouts/GuestLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FooterSocial } from '@/components/Layouts/Home/Footer'
import AuthCard from '@/components/Auth/AuthCard'
import AuthForm from '@/components/Auth/AuthForm'

const Register = () => (
  <GuestLayout>
    <AuthCard>
      <AuthForm
        initForm="register"
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

export default Register

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
