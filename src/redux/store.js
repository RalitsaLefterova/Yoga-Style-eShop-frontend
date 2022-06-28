import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
// import rootSaga from './root-saga'

// const sagaMiddleware = createSagaMiddleware()
// const middlewares = [sagaMiddleware]

const middlewares = [logger]

const composedEnhancers = compose(applyMiddleware(...middlewares))

// if (process.env.NODE_ENV ==='development') {
//   middlewares.push(logger)
// }

// the first argument is a function that is normally known as a reducer – required argument
// the second argument is the initial value of the state – optional argument
// the third argument is a middleware – optional argument
export const store = createStore(rootReducer, undefined, composedEnhancers)

// sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor }