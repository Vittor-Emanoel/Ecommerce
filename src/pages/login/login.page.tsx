import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.components'

import Loading from '../../components/loading/loading.component'

// Utilities
import validator from 'validator'
import { auth, db, googleProvider } from '../../config/firebase.config'

// Styles

import ErrorMessage from '../../components/input-error/error-message.component'

import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import { useAppSelector } from '../../hooks/redux.hooks'

interface LoginForm {
  email: string
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

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, data.email, data.password)
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

      const querySnapshot = await getDocs(
        query(
          collection(db, 'user'),
          where('id', '==', userCredentials.user.uid)
        )
      )

      const userExists = querySnapshot.docs[0]?.data()

      console.log(userCredentials.user.photoURL)

      if (!userExists) {
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
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={handleSignWithGooglePress}>
            Entrar com o Google
          </CustomButton>
          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>

            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                }
              })}
            />
            {errors?.email?.type === 'required' && (
              <ErrorMessage>o e-mail é obrigatório</ErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <ErrorMessage>Por favor, insira um e-mail válido</ErrorMessage>
            )}

            {errors?.email?.type === 'notFound' && (
              <ErrorMessage>O e-mail não foi encontrado.</ErrorMessage>
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>

            <CustomInput
              type="password"
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              {...register('password', {
                required: true
              })}
            />

            {errors?.password?.type === 'required' && (
              <ErrorMessage>a senha é obrigatória</ErrorMessage>
            )}
            {errors?.password?.type === 'mismatch' && (
              <ErrorMessage>Senha errada, tente novamente!</ErrorMessage>
            )}
          </LoginInputContainer>
          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}>
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
