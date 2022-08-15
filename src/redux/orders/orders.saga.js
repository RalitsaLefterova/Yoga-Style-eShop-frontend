import { takeLatest, put, all, call } from 'redux-saga/effects'

import OrdersActionTypes from './orders.types'
import { 
  createOrder,
  getOrderDetails
} from '../../rest-api/orders'
import {
  createOrderFailed,
  getOrderDetailsFailed,
  setSelectedOrder
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

export function* getOrderDetailsAsync({ payload: { orderId }}) {
  try {
    const response = yield call(getOrderDetails, orderId)
    yield put(setSelectedOrder(response.data))
  } catch (error) {
    yield put(getOrderDetailsFailed(error))
  }
}

export function* onGetOrderDetailsRequested() {
  yield takeLatest(OrdersActionTypes.GET_ORDER_DETAILS_REQUESTED, getOrderDetailsAsync)
}

export function* ordersSaga() {
  yield all([
    call(onCreateOrderRequested),
    call(onGetOrderDetailsRequested)
  ])
}