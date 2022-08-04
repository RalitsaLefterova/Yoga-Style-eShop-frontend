import { takeLatest, put, all, call } from 'redux-saga/effects'

import OrdersActionTypes from './orders.types'
import { 
  createOrder
} from '../../rest-api/orders'
import {
  createOrderFailed
} from './orders.actions'
import { 
  emptyCart 
} from '../cart/cart.actions'

export function* createOrderAsync({ payload: { data }}) {
  try {
    const response = yield call(createOrder, data)
    console.log('on createOrderAsync', {response})
    yield put(emptyCart())
  } catch (error) {
    yield put(createOrderFailed(error))
  }
}

export function* onCreateOrderRequested() {
  yield takeLatest(OrdersActionTypes.CREATE_ORDER_REQUESTED, createOrderAsync)
}

export function* ordersSaga() {
  yield all([
    call(onCreateOrderRequested)
  ])
}