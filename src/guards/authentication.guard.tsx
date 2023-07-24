import { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Components
import Header from '../components/header/header.components'
import Loading from '../components/loading/loading.component'

// Ultilities
import { useNavigate } from 'react-router-dom'

const AuthenticationGuard: FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading
          message={
            'Você precisa está logado para finalizar uma compra. Você será redirecionado para a página de login em instantes...'
          }
        />
      </>
    )
  }
  return <>{children}</>
}

export default AuthenticationGuard
