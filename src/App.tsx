import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FunctionComponent, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Pages
import CheckoutPage from './pages/checkout/checkout.page'
import ExplorePage from './pages/explore/explore.page'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

// Components
import CartComponent from './components/cart/cart.component'
import Loading from './components/loading/loading.component'
import AuthenticationGuard from './guards/authentication.guard'

// Utilities

import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converter'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import PaymentConfirmationPage from './pages/payment-confirmation/payment.confirmation.page'

const App: FunctionComponent = () => {
  const [isInitialized, setIsInitialized] = useState(true)

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSignIngOut = isAuthenticated && !user

      if (isSignIngOut) {
        dispatch({ type: 'LOGOUT_USER' })

        return setIsInitialized(false)
      }

      const isSignIngIn = !isAuthenticated && user
      if (isSignIngIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid)
          )
        )
        const userFromFirestore = querySnapshot.docs[0]?.data()

        dispatch({ type: 'LOGIN_USER', payload: userFromFirestore })

        return setIsInitialized(false)
      }
      return setIsInitialized(false)
    })
  }, [dispatch])

  if (isInitialized) return <Loading />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
        <Route
          path="/checkout"
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>

      <CartComponent />
    </BrowserRouter>
  )
}
export default App
