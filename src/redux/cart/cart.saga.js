import { takeLatest, put, all, call } from 'redux-saga/effects'

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
  clearProductFromCartFailed
} from './cart.actions'

export function* addProductToCartAsync({ payload: { productId }}) {
  try {
    const response = yield call(addToCart, productId)
//     console.log('addProductToCartAsync', response)
//   if (response && response.response && response.response.status && response.response.status === 401) {
//     history.push('/sign-in')
//     throw new Error(response.response.data)
//   }
    if (response && response.data) {
      const { id, title, price, mainImageUrl, collectionTitle } = response.data
      yield put(addProductToCartSuccess({ id, title, price, mainImageUrl, collectionTitle }))
    }
  } catch (error) {
    yield put(addProductToCartFailed(error))
  }
}

export function* onAddProductToCartRequested() {
  yield takeLatest(CartActionTypes.ADD_PRODUCT_TO_CART_REQUESTED, addProductToCartAsync)
}

export function* removeProductFromCartAsync({ payload: { productId }}) {
  try {
    const response = yield call(removeFromCart, productId)
    response && response.status === 200 && (yield put(removeProductFromCartSuccess(productId)))
  } catch (error) {
    yield put(removeProductFromCartFailed(error))
  }
}

export function* onRemoveProductFromCartRequested() {
  yield takeLatest(CartActionTypes.REMOVE_PRODUCT_FROM_CART_REQUESTED, removeProductFromCartAsync)
}

export function* clearProductFromCartAsync({ payload: { productId }}) {
  try {
    const response = yield call(clearFromCart, productId)
    response && response.status === 200 && (yield put(clearProductFromCartSuccess(productId)))
  } catch (error) {
    yield put(clearProductFromCartFailed(error))
  }
}

export function* onClearProductFromCartRequested() {
  yield takeLatest(CartActionTypes.CLEAR_PRODUCT_FROM_CART_REQUESTED, clearProductFromCartAsync)
}

export function* cartSaga() {
  yield all([
    call(onAddProductToCartRequested),
    call(onRemoveProductFromCartRequested),
    call(onClearProductFromCartRequested)
  ])
}