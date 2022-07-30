import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartProducts, selectCartTotal } from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import PaymentForm from '../../components/payment-form/payment-form.component'

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
        {/* TODO: get currency sign from util function */}
        Total price: ${total.toFixed(2)}
      </div>
      <div>
        <PaymentForm amount={1000} />
      </div>
    </div>
  )
}


export default Checkout