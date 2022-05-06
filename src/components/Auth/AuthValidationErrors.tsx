import { Alert } from '@mantine/core'
import { AlertCircle } from 'tabler-icons-react'
import { List } from '@mantine/core'

const AuthValidationErrors = ({ errors = [], ...props }) => (
  <>
    {errors.length > 0 && (
      <Alert
        icon={<AlertCircle size={16} />}
        title="Something went wrong"
        color="red"
        variant="outline"
        {...props}>
        <List>
          {errors.map(error => (
            <List.Item key={error}>{error}</List.Item>
          ))}
        </List>
      </Alert>
    )}
  </>
)

export default AuthValidationErrors
