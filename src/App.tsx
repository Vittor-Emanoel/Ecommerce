import { FunctionComponent } from 'react'

// components
import Header from './components/header/header.components'

interface AppProps {
  message?: string;
}

const App: FunctionComponent<AppProps> = ({ message }) => {
  return (
    <Header />
  )
}
export default App
