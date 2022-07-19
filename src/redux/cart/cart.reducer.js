import CartActionTypes from './cart.types'
import { addProductToCart, removeProductFromCart, clearProductFromCart } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartProducts: [],
  error: null
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case CartActionTypes.SET_CART:
      return {
        ...state,
        cartProducts: payload ? payload : []
      }
      
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }

    case CartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        cartProducts: addProductToCart(state.cartProducts, payload)
      }
      
    case CartActionTypes.REMOVE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        cartProducts: removeProductFromCart(state.cartProducts, payload)
      }

    case CartActionTypes.CLEAR_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        cartProducts: clearProductFromCart(state.cartProducts, payload)
      }

    case CartActionTypes.ADD_PRODUCT_TO_CART_FAILED:
    case CartActionTypes.REMOVE_PRODUCT_FROM_CART_FAILED:
    case CartActionTypes.CLEAR_PRODUCT_FROM_CART_FAILED:
      return {
        ...state,
        error: payload
      }

    case CartActionTypes.EMPTY_CART:
      return {
        ...state,
        cartProducts: []
      }

    default:
      return state
  }
}

export default cartReducer