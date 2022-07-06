import React from 'react'
import { useDispatch } from 'react-redux'

import { addProduct, removeProduct, clearProduct } from '../../redux/cart/cart.actions'
import { addToCart, removeFromCart, clearFromCart } from '../../rest-api/cart'

import './checkout-item.style.scss'

const CheckoutItem = ({ cartProduct }) => {
  const dispatch = useDispatch()

  const addProductToCart = () => dispatch(addProduct(cartProduct))
  const removeProductFromCart = () => dispatch(removeProduct(cartProduct)) 
  const clearProductFromCart = () => dispatch(clearProduct(cartProduct.id))

  const { title, mainImageUrl, price, quantity } = cartProduct

  const handleAddToCart = () => {
    addToCart(cartProduct.id).then(response => {
      console.log('handleAddToCart response', {response})

      if (response && response.response && response.response.status && response.response.status === 401) {
        history.push('/sign-in')
        throw new Error(response.response.data)
      }
      response && response.status === 200 && addProductToCart({
        id: cartProduct.id,
        title: cartProduct.title,
        price: cartProduct.price,
        mainImageUrl: cartProduct.mainImageUrl
      })
    }).catch(error => {
      let message = error.message
      console.log('handleAddToCart error', {message})
    })
  }

  const handleRemoveFromCart = () => {
    removeFromCart(cartProduct.id).then(response => {
      console.log('handleRemoveFromCart response', {response})
      response && response.status === 200 && removeProductFromCart({
        id: cartProduct.id
      })

    }).catch(error => {
      let message = error.message
      console.log('handleRemoveFromCart error', {message})
    })
  }

  const handleClearProductFromCart = () => {
    clearFromCart(cartProduct.id).then(response => {
      console.log('handleClearProductFromCart', response)
      response && response.status === 200 && clearProductFromCart(cartProduct.id)
    }).catch(error => {
      let message = error.message
      console.log('handleClearProductFromCart error', {message})
    })
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