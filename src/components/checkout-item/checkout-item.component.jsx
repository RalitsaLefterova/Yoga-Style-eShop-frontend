/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { memo } from 'react'
import { useDispatch } from 'react-redux'

import { 
  addProductToCartRequested, 
  removeProductFromCartRequested,
  clearProductFromCartRequested
} from '../../redux/cart/cart.actions'

import './checkout-item.style.scss'

const CheckoutItem = memo(({ cartProduct }) => {
  const dispatch = useDispatch()
  const { id: productId, title, mainImageUrl, price, quantity, collectionId } = cartProduct

  const handleAddToCart = () => {
    dispatch(addProductToCartRequested(productId))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCartRequested(productId))
  }

  const handleClearProductFromCart = () => {
    dispatch(clearProductFromCartRequested(productId))
  }
  
  return (
    <div className='checkout-product-container'>
      <div className='image-container'>
        <img src={mainImageUrl} alt={title} />
      </div>
      <span className='title'>{title}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveFromCart}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddToCart}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={handleClearProductFromCart}>&#10005;</div>
    </div>
  )
})

export default CheckoutItem