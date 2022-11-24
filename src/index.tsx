/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Elements } from '@stripe/react-stripe-js'

import { store, persistor } from './redux/store'
import { stripePromise } from './components/utils/stripe.utils'

import App from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App/>
          </Elements>
        </PersistGate>
      </BrowserRouter>
    </Provider> 
  // </StrictMode>
  )