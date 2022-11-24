import { BsGoogle } from 'react-icons/bs'

import CustomButton from '../../components/custom-buttom/custom-buttom.component'
import Header from '../../components/header/header.components'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
   <>
   <Header />

   <LoginContainer>
    <LoginContent >
    <LoginHeadline>Entre com a sua conta</LoginHeadline>
    <CustomButton startIcon={<BsGoogle size={18}/> }>
      Entrar com o Google
    </CustomButton>
    <LoginSubtitle>
      ou entre com o seu e-mail
    </LoginSubtitle>
    <LoginInputContainer>{/* Email input */}</LoginInputContainer>
    <LoginInputContainer>{/* Password input */}</LoginInputContainer>
    </LoginContent>
        {/* Button */}
   </LoginContainer>
   </>
  )
}

export default LoginPage
