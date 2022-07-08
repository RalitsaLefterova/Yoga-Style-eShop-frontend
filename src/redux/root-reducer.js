import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import collectionsReducer from './collections/collections.reducer'
import productsReducer from './products/products.reducer'
import cartReducer from './cart/cart.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'user',
    'cart'
  ]
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  collections: collectionsReducer,
  products: productsReducer
})

export default persistReducer(persistConfig, rootReducer)