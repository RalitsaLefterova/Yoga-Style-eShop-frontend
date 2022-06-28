
import React from 'react'

import './cart-product.style.scss'

const CartProduct = ({ cartProduct }) => {
  const { title, imgURL, price, quantity } = cartProduct
  return (
    <div className='cart-product-container'>
      <img src={imgURL} alt={`${name}`} />
      <div className='product-details'>
        <span className='title'>{title}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}


export default CartProduct