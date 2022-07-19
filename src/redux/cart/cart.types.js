const CartActionTypes = {
  SET_CART: 'SET_CART',
  TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',

  ADD_PRODUCT_TO_CART_REQUESTED: 'ADD_PRODUCT_TO_CART_REQUESTED',
  ADD_PRODUCT_TO_CART_SUCCESS: 'ADD_PRODUCT_TO_CART_SUCCESS',
  ADD_PRODUCT_TO_CART_FAILED: 'ADD_PRODUCT_TO_CART_FAILED',

  REMOVE_PRODUCT_FROM_CART_REQUESTED: 'REMOVE_PRODUCT_FROM_CART_REQUESTED',
  REMOVE_PRODUCT_FROM_CART_SUCCESS: 'REMOVE_PRODUCT_FROM_CART_SUCCESS',
  REMOVE_PRODUCT_FROM_CART_FAILED: 'REMOVE_PRODUCT_FROM_CART_FAILED',

  CLEAR_PRODUCT_FROM_CART_REQUESTED: 'CLEAR_PRODUCT_FROM_CART_REQUESTED',
  CLEAR_PRODUCT_FROM_CART_SUCCESS: 'CLEAR_PRODUCT_FROM_CART_SUCCESS',
  CLEAR_PRODUCT_FROM_CART_FAILED: 'CLEAR_PRODUCT_FROM_CART_FAILED',

  EMPTY_CART: 'CLEAR_CART'
}

export default CartActionTypes