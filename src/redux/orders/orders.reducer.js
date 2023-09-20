import { StripeError } from '@stripe/stripe-js'

import OrdersActionTypes from './orders.types'

const INITIAL_STATE = {
  isLoading: false,
  ordersList: [],
  selectedOrder: {},
  ordersError: null,
  paymentError: null
}

const ordersReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case OrdersActionTypes.CREATE_ORDER_REQUESTED:
    case OrdersActionTypes.GET_ORDERS_REQUESTED:
    case OrdersActionTypes.GET_ORDER_DETAILS_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case OrdersActionTypes.SET_ORDERS:
      return {
        ...state,
        isLoading: false,
        ordersList: payload,
        ordersError: null,
        paymentError: null
      }

    case OrdersActionTypes.SET_SELECTED_ORDER:
      return {
        ...state,
        isLoading: false,
        selectedOrder: payload,
        ordersError: null,
        paymentError: null
      }

    case OrdersActionTypes.GET_ORDERS_FAILED:
    case OrdersActionTypes.GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        ordersError: payload,
        paymentError: null
      }

      case OrdersActionTypes.CREATE_ORDER_FAILED:
        return {
          ...state,
          isLoading: false,
          ordersError: null,
          paymentError: payload
        }

    default:
      return state
  }
}

export default ordersReducer