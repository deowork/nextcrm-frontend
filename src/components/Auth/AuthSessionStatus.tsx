import { AlertCircle } from 'tabler-icons-react'
import { Alert } from '@mantine/core'
import { useRef } from 'react'

const AuthSessionStatus = ({ status, className = '', ...props }) => {
  const sessionRef = useRef(null)

  return (
    <>
      {status && (
        <Alert
          icon={<AlertCircle size={16} />}
          title="Status"
          color="gray"
          withCloseButton={true}
          ref={sessionRef}
          className={className}
          {...props}>
          {status}
        </Alert>
      )}
    </>
  )
}

export default AuthSessionStatus
