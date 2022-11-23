import { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import HomePage from './pages/home/home.page'

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
