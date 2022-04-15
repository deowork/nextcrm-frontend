import {useForm} from '@mantine/form'
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Center,
  Paper,
  Text,
  Divider,
  PaperProps,
  TextInput,
  Checkbox, Anchor
} from '@mantine/core'
import AuthCard from "@/components/AuthCard"
import Link from "next/link"
import ApplicationLogo from "@/components/ApplicationLogo"
import {GithubButton, GoogleButton} from "@/components/SocialButtons/SocialButtons"
import AuthValidationErrors from "@/components/AuthValidationErrors"
import GuestLayout from "@/components/Layouts/GuestLayout"
import {useState} from "react"
import {useAuth} from "@/hooks/auth"
import {At} from "tabler-icons-react"
import {createStyles} from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  link: {
    color: '#adb5bd',
    fontSize: '12px',
    textAlign: 'left',
    textDecoration: 'none'
  }
}))

interface FormValues {
  name: string
  email: string
  password: string
  password_confirmation: string
  remember: boolean
}


const Register = (props: PaperProps<'div'>) => {
  const {classes} = useStyles();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: 'secret',
      password_confirmation: 'sevret',
      remember: false
    },

    validate: {
      password_confirmation: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const {register} = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  const submitForm = async (props: FormValues) => {
    await register({setErrors, ...props})
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Center mt={30}>
            <Link href="/">
              <a>
                <ApplicationLogo width="80" height="80" fill="#ef3b2d"/>
              </a>
            </Link>
          </Center>
        }>
        <Paper
          radius="md"
          p="xl"
          sx={{maxWidth: 500}}
          mx="auto"
          mt={30}
          withBorder
          {...props}>
          <Text size="lg" weight={500}>
            Welcome to NextCRM
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <GithubButton radius="xl">Github</GithubButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <AuthValidationErrors mb={15} errors={errors}/>

          <form onSubmit={form.onSubmit(submitForm)}>

            <Group direction="column" grow>

              <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />

              <TextInput
                required
                autoFocus
                icon={<At/>}
                label="Email"
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.values.email}
                onChange={event =>
                  form.setFieldValue('email', event.currentTarget.value)
                }
                error={form.errors.email && 'Invalid email'}
                {...form.getInputProps('email')}
              />

              <PasswordInput
                id="password"
                type="password"
                value={password}
                label="Password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
                required
                autoComplete="new-password"
                {...form.getInputProps('password')}
              />

              <PasswordInput
                required
                id="password_confirmation"
                mt="sm"
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                value={password_confirmation}
                onChange={event =>
                  setPasswordConfirmation(event.target.value)
                }
                {...form.getInputProps('password_confirmation')}
              />

              <Checkbox
                mt="md"
                id="remember_me"
                name="remember"
                label="Remember me"
                {...form.getInputProps('remember', {type: 'checkbox'})}
              />

            </Group>

            <Group position="apart" mt="xl">
              <Anchor component={Link} href="/login">
                <a className={classes.link}>
                  Already registered?
                </a>
              </Anchor>
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Paper>
      </AuthCard>
    </GuestLayout>
  );
}

export default Register
