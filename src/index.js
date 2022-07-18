import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'
import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App/>
        </PersistGate>
      </BrowserRouter>
    </Provider> 
  // </StrictMode>
  )