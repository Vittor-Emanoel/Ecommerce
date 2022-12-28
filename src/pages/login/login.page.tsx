import { AuthError, AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.components'

import Loading from '../../components/loading/loading.component'

// Ultilities
import validator from 'validator'
import { auth, db, googleProvider } from '../../config/firebase.config'

// Styles
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import { UserContext } from '../../contexts/user.context'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

interface LoginForm {
  email: string,
  password: string
}

const LoginPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<LoginForm>()

  const [isLoading, setIsLoading] = useState(false)
  // se não tiver autenticado, será redirecionado para a página inicial
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await signInWithEmailAndPassword(auth,
        data.email,
        data.password)
      console.log(userCredentials)
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError('password', {
          type: 'mismatch'
        })
      }
      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError('email', {
          type: 'notFound'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignWithGooglePress = async () => {
    try {
      setIsLoading(true)
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(query(collection(db, 'user'), where('id', '==', userCredentials.user.uid)))

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]
        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google.com'

        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
   <>
   <Header />
   {isLoading && <Loading />}

   <LoginContainer>
    <LoginContent >
    <LoginHeadline>Entre com a sua conta</LoginHeadline>
    <CustomButton startIcon={<BsGoogle size={18}/>}
    onClick={handleSignWithGooglePress}>
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
        required: true,
        validate: (value) => {
          return validator.isEmail(value)
        }

      })}/>
      {errors?.email?.type === 'required' && (
      <InputErrorMessage>o e-mail é obrigatório</InputErrorMessage>
      )}

      {errors?.email?.type === 'validate' && (
        <InputErrorMessage>Por favor, insira um e-mail válido</InputErrorMessage>
      )}

      {errors?.email?.type === 'notFound' && (
        <InputErrorMessage>O e-mail não foi encontrado.</InputErrorMessage>
      )}

    </LoginInputContainer>
    <LoginInputContainer>
    <p>Senha</p>

    <CustomInput
    type='password'
    hasError={!!errors?.password}
    placeholder='Digite sua senha' {...register('password', {
      required: true
    })}/>

    {errors?.password?.type === 'required' && (
      <InputErrorMessage>a senha é obrigatória</InputErrorMessage>
    )}
     {errors?.password?.type === 'mismatch' && (
      <InputErrorMessage>Senha errada, tente novamente!</InputErrorMessage>
     )}

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
