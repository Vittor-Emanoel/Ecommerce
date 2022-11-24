import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.components'

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log({ data })
  }

  console.log(errors)

  return (
   <>
   <Header />

   <LoginContainer>
    <LoginContent >
    <LoginHeadline>Entre com a sua conta</LoginHeadline>
    <CustomButton startIcon={<BsGoogle size={18}/>}>
      Entrar com o Google
    </CustomButton>
    <LoginSubtitle>
      ou entre com o seu e-mail
    </LoginSubtitle>
    <LoginInputContainer>
      <p>E-mail</p>

      <CustomInput
      hasError={!!errors?.email}
      placeholder='Digite seu e-mail' {...register('email', {
        required: true
      })}/>

    </LoginInputContainer>
    <LoginInputContainer>
    <p>Senha</p>

    <CustomInput
    hasError={!!errors?.password}
    placeholder='Digite sua senha' {...register('password', {
      required: true
    })}/>

    </LoginInputContainer>
        <CustomButton startIcon={<FiLogIn size={18}/> } onClick={() => handleSubmit(handleSubmitPress)()}>
          Entrar
        </CustomButton>
    </LoginContent>
   </LoginContainer>
   </>
  )
}

export default LoginPage
