import React from 'react'
import { connect } from 'react-redux'

import { addProduct, removeProduct, clearProductFromCart } from '../../redux/cart/cart.actions'
import { addToCart, removeFromCart, clearFromCart } from '../../rest-api/cart'

import './checkout-item.style.scss'

const CheckoutItem = ({ cartProduct, addProduct, removeProduct, clearProductFromCart }) => {
  console.log('in checkout item', {cartProduct})
  const { title, imgURL, price, quantity } = cartProduct

  const handleAddToCart = () => {
    addToCart(cartProduct._id).then(response => {
      console.log('handleAddToCart response', {response})

      if (response && response.response && response.response.status && response.response.status === 401) {
        history.push('/sign-in')
        throw new Error(response.response.data)
      }
      response && response.status === 200 && addProduct({
        _id: cartProduct._id,
        title: cartProduct.title,
        price: cartProduct.price,
        imgURL: cartProduct.imgURL
      })
    }).catch(error => {
      let message = error.message
      console.log('handleAddToCart error', {message})
    })
  }

  const handleRemoveFromCart = () => {
    removeFromCart(cartProduct._id).then(response => {
      console.log('handleRemoveFromCart response', {response})
      response && response.status === 200 && removeProduct({
        _id: cartProduct._id
      })

    }).catch(error => {
      let message = error.message
      console.log('handleRemoveFromCart error', {message})
    })
  }

  const handleClearProductFromCart = () => {
    clearFromCart(cartProduct._id).then(response => {
      console.log('handleClearProductFromCart', response)
      response && response.status === 200 && clearProductFromCart({
        _id: cartProduct._id
      })
    }).catch(error => {
      let message = error.message
      console.log('handleClearProductFromCart error', {message})
    })
  }
  
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imgURL} alt='product picture' />
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

const mapDispatchToProps = dispatch => ({
  clearProductFromCart: product => dispatch(clearProductFromCart(product)),
  addProduct: product => dispatch(addProduct(product)),
  removeProduct: product => dispatch(removeProduct(product))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)