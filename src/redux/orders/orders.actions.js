import OrdersActionTypes from './orders.types'
import { createAction } from '../reducer.utils'

export const createOrderRequested = data => 
  createAction(OrdersActionTypes.CREATE_ORDER_REQUESTED, { data })

export const createOrderFailed = error => 
  createAction(OrdersActionTypes.CREATE_ORDER_FAILED, error)

export const setOrders = orders => 
  createAction(OrdersActionTypes.SET_ORDERS, orders)