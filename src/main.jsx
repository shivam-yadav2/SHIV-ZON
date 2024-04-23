import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import cart from './assets/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={cart}>
    <App />
  </Provider>,
)
