import CartActionTypes from './cart.types'
import { createAction } from '../reducer.utils'

export const setCart = cart =>
  createAction(CartActionTypes.SET_CART, cart)

export const toggleCartHidden = () => 
  createAction(CartActionTypes.TOGGLE_CART_HIDDEN)

export const addProduct = product => 
  createAction(CartActionTypes.ADD_PRODUCT, product)

export const removeProduct = product => 
  createAction(CartActionTypes.REMOVE_PRODUCT, product)

export const clearProductFromCart = product => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART, product)

export const clearCart = () => 
  createAction(CartActionTypes.CLEAR_CART)