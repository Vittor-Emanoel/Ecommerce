import { FunctionComponent } from 'react'
import { InputErrorMessageContainer } from './error-message.styles'

const ErrorMessage: FunctionComponent = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default ErrorMessage
