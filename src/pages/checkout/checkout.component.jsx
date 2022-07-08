import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartProducts, selectCartTotal } from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.style.scss'

const Checkout = () => {
  const cartProducts = useSelector(selectCartProducts)
  const total = useSelector(selectCartTotal)

  const chekoutTableHeader = () => {
    const headerCellsName = ['Product', 'Description', 'Quantity', 'Price', 'Remove']
    return (
      headerCellsName.map((cellName, index) => (
        <div className="header-block" key={index}>
          <span>{cellName}</span>
        </div>
      ))
    )
  }

  return (
    <div className='checkout-page-container'>
      <div className="checkout-header">
        {chekoutTableHeader()}
      </div>
      {cartProducts.length > 0 ? cartProducts.map(product => (
        <CheckoutItem
          key={product.id}
          cartProduct={product} />
      )) : (
        <Fragment>
          Your cart is empty. <Link to='/shop'>Start shopping.</Link>
        </Fragment>
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