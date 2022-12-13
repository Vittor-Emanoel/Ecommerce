import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

// ultilitis
import { auth } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

// Styles
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'

const Header = () => {
  const navigate = useNavigate()

  const { isAuthentication } = useContext(UserContext)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  return (
      <HeaderContainer>
          <HeaderTitle>
            CLUB CLOTHING
          </HeaderTitle>
          <HeaderItems>
            <HeaderItem>
            Explorar
            </HeaderItem>

          {!isAuthentication && (
            <>
             <HeaderItem onClick={handleLoginClick}>
             Login
           </HeaderItem >
           <HeaderItem onClick={handleSignUpClick}>
            Criar conta
          </HeaderItem>
           </>
          )}

          {isAuthentication && (

          <HeaderItem onClick={() => signOut(auth)}>
                Sair
          </HeaderItem>

          )}

          <HeaderItem >
            <BsCart3 size={25}/>
            <p style={{ marginLeft: 5 }}>5</p>
          </HeaderItem>
          </HeaderItems>
      </HeaderContainer>
  )
}

export default Header
