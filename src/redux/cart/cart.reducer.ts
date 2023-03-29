import CartActionTypes from './cart.types'
import { AnyAction } from 'redux'

import { CartProduct } from 'shared/types/products'
import { 
  addProductToCart, 
  removeProductFromCart, 
  clearProductFromCart 
} from './cart.utils'
import { 
  addProductToCartFailed,
  addProductToCartSuccess, 
  clearProductFromCartFailed, 
  clearProductFromCartSuccess, 
  closeCartRequested, 
  emptyCart, 
  removeProductFromCartFailed, 
  removeProductFromCartSuccess, 
  setCartProducts, 
  toggleCartHidden 
} from './cart.actions'

export type CartState = {
  readonly hidden: boolean
  readonly cartProducts: CartProduct[]
  readonly error: Error | null
}
const INITIAL_STATE: CartState = {
  hidden: true,
  cartProducts: [],
  error: null
}

const cartReducer = (
  state = INITIAL_STATE, 
  action = {} as AnyAction
): CartState => {
  
  if (setCartProducts.match(action)) {
    return {
      ...state,
      cartProducts: action.payload ? action.payload : []
    }
  }

  if (toggleCartHidden.match(action)) {
    return {
      ...state,
      hidden: !state.hidden
    }
  }

  if (closeCartRequested.match(action)) {
    return {
      ...state,
      hidden: true
    }
  }

  if (addProductToCartSuccess.match(action)) {
    return {
      ...state,
      cartProducts: addProductToCart(state.cartProducts, action.payload)
    }
  }

  if (removeProductFromCartSuccess.match(action)) {
    return {
      ...state,
      cartProducts: removeProductFromCart(state.cartProducts, action.payload.id)
    }
  }

  if (clearProductFromCartSuccess.match(action)) {
    return {
      ...state,
      cartProducts: clearProductFromCart(state.cartProducts, action.payload.id)
    }
  }

  if (
    addProductToCartFailed.match(action) ||
    removeProductFromCartFailed.match(action) ||
    clearProductFromCartFailed.match(action)
    ) {
      return {
        ...state,
        error: action.payload
      }
    }

    if (emptyCart.match(action)) {
      return {
        ...state,
        cartProducts: []
      }
    }

    return state
}

export default cartReducer