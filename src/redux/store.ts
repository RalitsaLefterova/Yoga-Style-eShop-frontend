import { compose, configureStore } from '@reduxjs/toolkit'
import { Persistor, persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { persistedReducer } from './root-reducer'
import { rootSaga } from './root-saga'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const devMode = process.env.NODE_ENV !=='production' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const sagaMiddleware = createSagaMiddleware()

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean)
// const middlewares = [loggerMiddleware]

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...middleWares],
  devTools: devMode
})

sagaMiddleware.run(rootSaga)

export const persistor: Persistor = persistStore(store)