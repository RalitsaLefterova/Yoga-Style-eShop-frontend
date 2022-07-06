import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import { loggerMiddleware } from './middleware/logger'

// import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
// import rootSaga from './root-saga'

// const sagaMiddleware = createSagaMiddleware()
// const middlewares = [sagaMiddleware]

const middlewares = [process.env.NODE_ENV !=='production' && logger, thunk].filter(Boolean)
// const middlewares = [loggerMiddleware]


// Modification of the compose method 
// to be able to use Redux DevTools in the browser
const composeEnhancer = (process.env.NODE_ENV !=='production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

// the first argument is a function that is normally known as a reducer – required argument
// the second argument is the initial value of the state – optional argument
// the third argument is a middleware – optional argument
export const store = createStore(rootReducer, undefined, composedEnhancers)

// sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default { store, persistor }