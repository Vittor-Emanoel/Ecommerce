import { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
