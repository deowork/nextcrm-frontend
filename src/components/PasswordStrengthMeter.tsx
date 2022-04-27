import { useState } from 'react'
import { useInputState } from '@mantine/hooks'
import { useTranslation } from 'next-i18next'
import { Check, X } from 'tabler-icons-react'
import {
  PasswordInput,
  Progress,
  Popover,
  Group,
  Text,
  Box,
} from '@mantine/core'

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean
  label: string
}) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm">
      {meets ? <Check /> : <X />} <Box ml={10}>{label}</Box>
    </Text>
  )
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-zа-яёіїє]/, label: 'Includes lowercase letter' },
  { re: /[A-ZА-ЯЁІЇЄ]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
]

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  requirements.forEach(requirement => {
    if (!requirement.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

export function PasswordStrength({
  popover = true,
  value,
  onChange,
  ...props
}) {
  const { t } = useTranslation('common')
  const [popoverOpened, setPopoverOpened] = useState(false)

  const strength = getStrength(value)
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={t(requirement.label)}
      meets={requirement.re.test(value)}
    />
  ))

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={color}
        key={index}
        size={4}
      />
    ))

  const handlePasswordChange = event => {
    onChange(event.currentTarget.value)
  }

  const passwordInput = (
    <PasswordInput
      required
      value={value}
      onChange={handlePasswordChange}
      {...props}
    />
  )

  const passwordRequirements = (
    <>
      <PasswordRequirement
        label={t('Has at least 8 characters')}
        meets={value.length >= 8}
      />
      {checks}
    </>
  )

  return popover ? (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={passwordInput}>
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />

      {passwordRequirements}
    </Popover>
  ) : (
    <div>
      {passwordInput}

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      {passwordRequirements}
    </div>
  )
}
