import OrdersActionTypes from './orders.types'
import { createAction } from '../reducer.utils'

export const createOrderRequested = data => 
  createAction(OrdersActionTypes.CREATE_ORDER_REQUESTED, { data })

export const createOrderFailed = error => 
  createAction(OrdersActionTypes.CREATE_ORDER_FAILED, error)


export const setOrders = orders => 
  createAction(OrdersActionTypes.SET_ORDERS, orders)

export const setSelectedOrder = order => 
  createAction(OrdersActionTypes.SET_SELECTED_ORDER, order)


export const getOrdersRequested = () =>
  createAction(OrdersActionTypes.GET_ORDERS_REQUESTED)

export const getOrdersFailed = error => 
  createAction(OrdersActionTypes.GET_ORDERS_FAILED, error)


export const getOrderDetailsRequested = orderId =>
  createAction(OrdersActionTypes.GET_ORDER_DETAILS_REQUESTED, { orderId })

export const getOrderDetailsFailed = error => 
  createAction(OrdersActionTypes.GET_ORDER_DETAILS_FAILED, error)
  

export const editOrderRequested = (orderId, data) => {
  createAction(OrdersActionTypes.EDIT_ORDER_REQUESTED, { orderId, data })
}

export const editOrderFaied = error => 
  createAction(OrdersActionTypes.EDIT_ORDER_FAILED, error)