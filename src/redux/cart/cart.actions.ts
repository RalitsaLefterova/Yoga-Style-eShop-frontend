import CartActionTypes from './cart.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../reducer.utils'
import { CartProduct } from 'shared/types/products'


// SET CART PRODUCTS //
export type SetCartProducts = ActionWithPayload<CartActionTypes.SET_CART_PRODUCTS, CartProduct[]>
export const setCartProducts = withMatcher((cart: CartProduct[]): SetCartProducts =>
  createAction(CartActionTypes.SET_CART_PRODUCTS, cart))


// TOGGLE CART HIDDEN //
export type ToggleCartHidden = Action<CartActionTypes.TOGGLE_CART_HIDDEN>
export const toggleCartHidden = withMatcher((): ToggleCartHidden => 
  createAction(CartActionTypes.TOGGLE_CART_HIDDEN))


// ADD PRODUCT TO CART //
export type AddProductToCartRequested = ActionWithPayload<CartActionTypes.ADD_PRODUCT_TO_CART_REQUESTED, { productId: string}>
export const addProductToCartRequested = withMatcher((productId: string): AddProductToCartRequested =>
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_REQUESTED, { productId }))

export type AddProductToCartSuccess = ActionWithPayload<CartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS, CartProduct>
export const addProductToCartSuccess = withMatcher((product: CartProduct): AddProductToCartSuccess => 
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS, product))

export type AddProductToCartFailed = ActionWithPayload<CartActionTypes.ADD_PRODUCT_TO_CART_FAILED, Error>
export const addProductToCartFailed = withMatcher((error: Error): AddProductToCartFailed => 
  createAction(CartActionTypes.ADD_PRODUCT_TO_CART_FAILED, error))


// REMOVE PRODUCT FROM CART (REDUCE QUANTITY) //
export type RemoveProductFromCartRequested = ActionWithPayload<CartActionTypes.REMOVE_PRODUCT_FROM_CART_REQUESTED, { productId: string}>
export const removeProductFromCartRequested = withMatcher((productId: string): RemoveProductFromCartRequested =>
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_REQUESTED, { productId }))

export type RemoveProductFromCartSuccess = ActionWithPayload<CartActionTypes.REMOVE_PRODUCT_FROM_CART_SUCCESS, CartProduct>
export const removeProductFromCartSuccess = withMatcher((product: CartProduct): RemoveProductFromCartSuccess => 
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_SUCCESS, product))

export type RemoveProductFromCartFailed = ActionWithPayload<CartActionTypes.REMOVE_PRODUCT_FROM_CART_FAILED, Error>
export const removeProductFromCartFailed = withMatcher((error: Error): RemoveProductFromCartFailed => 
  createAction(CartActionTypes.REMOVE_PRODUCT_FROM_CART_FAILED, error))


// CLEAR/DELETE PRODUCT FROM CART //
export type ClearProductFromCartRequested = ActionWithPayload<CartActionTypes.CLEAR_PRODUCT_FROM_CART_REQUESTED, { productId: string }>
export const clearProductFromCartRequested = withMatcher((productId: string): ClearProductFromCartRequested =>
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_REQUESTED, { productId }))

export type ClearProductFromCartSuccess = ActionWithPayload<CartActionTypes.CLEAR_PRODUCT_FROM_CART_SUCCESS, CartProduct>
export const clearProductFromCartSuccess = withMatcher((product: CartProduct): ClearProductFromCartSuccess => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_SUCCESS, product))

export type ClearProductFromCartFailed = ActionWithPayload<CartActionTypes.CLEAR_PRODUCT_FROM_CART_FAILED, Error>
export const clearProductFromCartFailed = withMatcher((error: Error): ClearProductFromCartFailed => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART_FAILED, error))


// EMPTY CART //
export type EmptyCart = Action<CartActionTypes.EMPTY_CART>
export const emptyCart = withMatcher((): EmptyCart => 
  createAction(CartActionTypes.EMPTY_CART))