import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import collectionsReducer from './collections/collections.reducer'
import productsReducer from './products/products.reducer'
import cartReducer from './cart/cart.reducer'
import ordersReducer from './orders/orders.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  collections: collectionsReducer,
  products: productsReducer,
  orders: ordersReducer
})

export default persistReducer(persistConfig, rootReducer)