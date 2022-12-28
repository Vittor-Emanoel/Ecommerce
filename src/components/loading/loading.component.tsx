import { FunctionComponent } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { LoadingContainer } from './loading.styles'

interface LoadingProps {
  message?: String
}

const Loading: FunctionComponent<LoadingProps> = ({ message }) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
        <SyncLoader size={30} />
    </LoadingContainer>
  )
}

export default Loading
