import CartActionTypes from "./cart.types"

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addProduct = product => ({
  type: CartActionTypes.ADD_PRODUCT,
  payload: product
})

export const removeProduct = product => ({
  type: CartActionTypes.REMOVE_PRODUCT,
  payload: product
})

export const clearProductFromCart = product => ({
  type: CartActionTypes.CLEAR_PRODUCT_FROM_CART,
  payload: product
})

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
})