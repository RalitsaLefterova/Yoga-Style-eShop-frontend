import CartActionTypes from './cart.types'
import { addProductToCart, removeProductFromCart, clearProductFromCart } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartProducts: []
}

const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action
  // console.log('cart reducer action: ', {action})

  switch (type) {

    case CartActionTypes.SET_CART:
      return {
        ...state,
        cartProducts: payload
      }
      
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }

    case CartActionTypes.ADD_PRODUCT:
      // console.log('state.cartProducts', state.cartProducts, 'action.payload', payload)
      return {
        ...state,
        cartProducts: addProductToCart(state.cartProducts, payload)
      }

    case CartActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        cartProducts: removeProductFromCart(state.cartProducts, payload)
      }

    case CartActionTypes.CLEAR_PRODUCT_FROM_CART:
      return {
        ...state,
        cartProducts: clearProductFromCart(state.cartProducts, payload)
      }

    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartProducts: []
      }

    default:
      return state
  }
}

export default cartReducer