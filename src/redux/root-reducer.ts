import { combineReducers } from 'redux'
import { persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import collectionsReducer from './collections/collections.reducer'
import productsReducer from './products/products.reducer'
import cartReducer from './cart/cart.reducer'
import ordersReducer from './orders/orders.reducer'
import statisticsReducer from './statistics/statistics.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  collections: collectionsReducer,
  products: productsReducer,
  orders: ordersReducer,
  statistics: statisticsReducer
})

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart']
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)