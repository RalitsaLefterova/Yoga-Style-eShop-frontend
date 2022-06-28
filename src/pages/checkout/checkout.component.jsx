import React from 'react'
import { connect } from 'react-redux'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.style.scss'

const Checkout = ({ cartProducts, total }) => (
  <div className='checkout-page-container'>
    <div className="checkout-header">
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
    {cartProducts.map(product => (
      <CheckoutItem
        key={product._id}
        cartProduct={product} />
    ))}
    <div className="total">
      Total price: ${total}
    </div>
    <div className="test-warning">
      *Please use the following test credit card for payments
      <br />
      4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
    </div>
  </div>
)

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

export default connect(mapStateToProps)(Checkout)