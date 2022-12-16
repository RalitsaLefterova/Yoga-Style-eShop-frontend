import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

// import { loggerMiddleware } from './middleware/logger'
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const devMode = process.env.NODE_ENV !=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  process.env.NODE_ENV !=='production' && logger,
  sagaMiddleware
].filter(Boolean)
// const middlewares = [loggerMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
  devTools: devMode
});

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor }