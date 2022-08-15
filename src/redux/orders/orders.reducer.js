import OrdersActionTypes from './orders.types'

const INITIAL_STATE = {
  ordersList: [],
  selectedOrder: {},
  error: null
}

const ordersReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case OrdersActionTypes.SET_ORDERS:
      return {
        ...state,
        ordersList: payload
      }

    case OrdersActionTypes.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: payload
      }

    case OrdersActionTypes.CREATE_ORDER_FAILED:
    case OrdersActionTypes.GET_ORDERS_FAILED:
    case OrdersActionTypes.GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}

export default ordersReducer