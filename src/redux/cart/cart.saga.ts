import { takeLatest, put, all, call } from 'typed-redux-saga'

import CartActionTypes from './cart.types'
import { 
  addToCart,
  removeFromCart,
  clearFromCart
} from '../../rest-api/cart'
import { 
  addProductToCartSuccess,
  addProductToCartFailed,
  removeProductFromCartSuccess,
  removeProductFromCartFailed,
  clearProductFromCartSuccess,
  clearProductFromCartFailed,
  AddProductToCartRequested,
  RemoveProductFromCartRequested,
  ClearProductFromCartRequested
} from './cart.actions'

// ADD PRODUCT TO CART //
export function* addProductToCartAsync({ payload: { productId }}: AddProductToCartRequested) {
  try {
    const addToCartResponse = yield* call(addToCart, productId)
    yield* put(addProductToCartSuccess(addToCartResponse.data))
  } catch (error) {
    yield* put(addProductToCartFailed(error as Error))
  }
}
export function* onAddProductToCartRequested() {
  yield* takeLatest(CartActionTypes.ADD_PRODUCT_TO_CART_REQUESTED, addProductToCartAsync)
}

// REMOVE PRODUCT FROM CART (REDUCE QUANTITY) //
export function* removeProductFromCartAsync({ payload: { productId }}: RemoveProductFromCartRequested) {
  try {
    const removeProductFromCartResponse = yield* call(removeFromCart, productId)
    yield* put(removeProductFromCartSuccess(removeProductFromCartResponse.data))
  } catch (error) {
    yield* put(removeProductFromCartFailed(error as Error))
  }
}
export function* onRemoveProductFromCartRequested() {
  yield* takeLatest(CartActionTypes.REMOVE_PRODUCT_FROM_CART_REQUESTED, removeProductFromCartAsync)
}

// CLEAR/DELETE PRODUCT FROM CART //
export function* clearProductFromCartAsync({ payload: { productId }}: ClearProductFromCartRequested) {
  try {
    const clearProductFromCartResponse = yield* call(clearFromCart, productId)
    yield* put(clearProductFromCartSuccess(clearProductFromCartResponse.data))
  } catch (error) {
    yield* put(clearProductFromCartFailed(error as Error))
  }
}
export function* onClearProductFromCartRequested() {
  yield* takeLatest(CartActionTypes.CLEAR_PRODUCT_FROM_CART_REQUESTED, clearProductFromCartAsync)
}

export function* cartSaga() {
  yield* all([
    call(onAddProductToCartRequested),
    call(onRemoveProductFromCartRequested),
    call(onClearProductFromCartRequested)
  ])
}