import CartActionTypes from './cart.types'

const INITIAL_STATE = {
  hidden: true,
  cartProducts: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    case CartActionTypes.ADD_PRODUCT:
      return {
        ...state,
        // cartProducts: 
      }
      case CartActionTypes.CLEAR_CART:
        return {
          ...state,
          cartItems: []
        }
      default:
        return state
  }
}

export default cartReducer