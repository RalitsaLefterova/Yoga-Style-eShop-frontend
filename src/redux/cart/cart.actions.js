import CartActionTypes from './cart.types'
import { createAction } from '../reducer.utils'
import { addToCart, removeFromCart, clearFromCart } from '../../rest-api/cart'

export const setCart = cart =>
  createAction(CartActionTypes.SET_CART, cart)

export const toggleCartHidden = () => 
  createAction(CartActionTypes.TOGGLE_CART_HIDDEN)

export const addProduct = product => 
  createAction(CartActionTypes.ADD_PRODUCT, product)

export const removeProduct = product => 
  createAction(CartActionTypes.REMOVE_PRODUCT, product)

export const clearProduct = product => 
  createAction(CartActionTypes.CLEAR_PRODUCT_FROM_CART, product)

export const clearCart = () => 
  createAction(CartActionTypes.CLEAR_CART)

export const addProductToCartAsync = productId => async(dispatch) => {
  try {
    const response = await addToCart(productId)
    console.log('addProductToCartAsync', response)
    //   if (response && response.response && response.response.status && response.response.status === 401) {
    //     history.push('/sign-in')
    //     throw new Error(response.response.data)
    //   }
    if (response && response.data) {
      const { id, title, price, mainImageUrl } = response.data
      dispatch(addProduct({ id, title, price, mainImageUrl }))
    }
  } catch (error) {
    console.log(error)
    //   let message = error.message
    //   console.log('handleAddToCart error', {message})
  }
}

export const removeProductFromCartAsync = productId => async (dispatch) => {
  try {
    const response = await removeFromCart(productId)
    response && response.status === 200 && dispatch(removeProduct(productId))
  } catch (error) {
    console.log(error)
    //   let message = error.message
    //   console.log('handleRemoveFromCart error', {message})
  }
}

export const clearProductFromCartAsync = productId => async (dispatch) => {
  try {
    const response = await clearFromCart(productId)
    response && response.status === 200 && dispatch(clearProduct(productId))
  } catch (error) {
    console.log(error)
    //   let message = error.message
    //   console.log('handleClearProductFromCart error', {message})
  }
}