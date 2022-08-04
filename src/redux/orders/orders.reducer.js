import OrdersActionTypes from './orders.types'

const INITIAL_STATE = {
  ordersList: [],
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

    case OrdersActionTypes.CREATE_ORDER_FAILED:
      return {
        ...state,
        error: payload
      }

    default:
      return state
  }
}

export default ordersReducer