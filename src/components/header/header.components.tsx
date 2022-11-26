import { BsCart3 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

// Styles
import { HeaderContainer, HeaderItem, HeaderItems, HeaderTitle } from './header.styles'

const Header = () => {
  const navigate = useNavigate()

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
          <HeaderItem onClick={handleLoginClick}>
            Login
          </HeaderItem >
          <HeaderItem onClick={handleSignUpClick}>
            Criar conta
          </HeaderItem>
          <HeaderItem >
            <BsCart3 size={25}/>
            <p style={{ marginLeft: 5 }}>5</p>
          </HeaderItem>
          </HeaderItems>
      </HeaderContainer>
  )
}

export default Header
