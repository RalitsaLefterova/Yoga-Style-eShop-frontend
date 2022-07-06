import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartProducts, selectCartTotal } from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.style.scss'

const Checkout = () => {
  const cartProducts = useSelector(selectCartProducts)
  const total = useSelector(selectCartTotal)

  return (
    <div className='checkout-page-container'>
      <div className="checkout-header">
        {/* TODO: make header cells as a separate component */}
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span></span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartProducts.length > 0 ? cartProducts.map(product => (
        <CheckoutItem
          key={product.id}
          cartProduct={product} />
      )) : (
        <React.Fragment>
          Your cart is empty. <Link to='/shop'>Start shopping.</Link>
        </React.Fragment>
      )}
      
      <div className="total">
        Total price: ${total.toFixed(2)}
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
      </div>
    </div>
  )
}


export default Checkout