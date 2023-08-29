import React from 'react'

import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import App from './App'

// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import reportWebVitals from './reportWebVitals'

import theme from './theme/theme.color'
import { store, persistedStore } from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
