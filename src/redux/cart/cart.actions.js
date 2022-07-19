import CartActionTypes from './cart.types'
import { createAction } from '../reducer.utils'
import { removeFromCart, clearFromCart } from '../../rest-api/cart'

export const setCart = cart =>
  createAction(CartActionTypes.SET_CART, cart)

export const toggleCartHidden = () => 
  createAction(CartActionTypes.TOGGLE_CART_HIDDEN)


export const addProductToCartRequested = (productId) =>
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_REQUESTED, { productId })

export const addProductToCartSuccess = product => 
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS, product)

export const addProductToCartFailed = error => 
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_FAILED, error)


export const removeProductFromCartRequested = (productId) =>
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_REQUESTED, { productId })

export const removeProductFromCartSuccess = product => 
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_SUCCESS, product)

export const removeProductFromCartFailed = error => 
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_FAILED, error)


export const clearProductFromCartRequested = (productId) =>
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_REQUESTED, { productId })

export const clearProductFromCartSuccess = product => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_SUCCESS, product)

export const clearProductFromCartFailed = error => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_FAILED, error)


export const emptyCart = () => 
  createAction(CartActionTypes.EMPTY_CART)