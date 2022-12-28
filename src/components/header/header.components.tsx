import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

// ultilitis
import { auth } from '../../config/firebase.config'
import { CartContext } from '../../contexts/cart.context'
import { UserContext } from '../../contexts/user.context'

// Styles
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'

const Header = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(UserContext)
  const { productsCount, toggleCart } = useContext(CartContext)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  return (
      <HeaderContainer>
          <HeaderTitle onClick={handleLogoClick}>
            CLUB CLOTHING
          </HeaderTitle>
          <HeaderItems>
            <HeaderItem onClick={handleExploreClick}>
            Explorar
            </HeaderItem>

          {!isAuthenticated && (
            <>
             <HeaderItem onClick={handleLoginClick}>
             Login
           </HeaderItem >
           <HeaderItem onClick={handleSignUpClick}>
            Criar conta
          </HeaderItem>
           </>
          )}

          { isAuthenticated && (

          <HeaderItem onClick={() => signOut(auth)}>
                Sair
          </HeaderItem>

          )}

          <HeaderItem >
            <BsCart3 size={25} onClick={toggleCart}/>
            <p style={{ marginLeft: 5 }}>{productsCount}</p>
          </HeaderItem>
          </HeaderItems>
      </HeaderContainer>
  )
}

export default Header
