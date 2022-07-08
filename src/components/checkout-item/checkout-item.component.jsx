import React from 'react'
import { useDispatch } from 'react-redux'

import { addProductToCartAsync, removeProductFromCartAsync, clearProductFromCartAsync } from '../../redux/cart/cart.actions'

import './checkout-item.style.scss'

const CheckoutItem = ({ cartProduct }) => {
  const dispatch = useDispatch()
  const { title, mainImageUrl, price, quantity } = cartProduct

  const handleAddToCart = () => {
    dispatch(addProductToCartAsync(cartProduct.id))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCartAsync(cartProduct.id))
  }

  const handleClearProductFromCart = () => {
    dispatch(clearProductFromCartAsync(cartProduct.id))
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
}

export default CheckoutItem