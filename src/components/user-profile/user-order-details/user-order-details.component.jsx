import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { formatCurrency } from 'shared/helpers'
import { getOrderDetailsRequested } from '../../../redux/orders/orders.actions'
import { selectOrderDetails } from '../../../redux/orders/orders.selectors'

import './user-order-details.style.scss'

const UserOrderDetails = ({ orderId, handleBackToOrdersList }) => {
  const dispatch = useDispatch()
  const order = useSelector(selectOrderDetails)
  const { createdAt, delivery_address, products, status, total } = order
  const { city, postalCode, street, country } = delivery_address || {}

  useEffect(() => {
    dispatch(getOrderDetailsRequested(orderId))
  }, [])

  return (
    <>
      <button onClick={handleBackToOrdersList}>
        Go back to orders list
      </button>  

      <div>
        <span>Order date: </span><span>{createdAt}</span>
        <span>Status: </span><span>{status}</span>
        <span>Delivery address: {street}, {city} {postalCode}, {country}</span>
        <span>Total: </span><span>{total}</span>
        <span></span>
      </div>
      {(products || []).map((productItem, index) => {
        const { product, quantity} = productItem
        const { title, mainImageUrl, price } = product
        return (
          <div className='product-details-container' key={index}>
            <div><img src={mainImageUrl} /></div>
            <div>{title}</div>
            <div>{formatCurrency(price)}</div>
            <div>{quantity}</div>
          </div>
        )}
      )}
    </>
  )
}

export default UserOrderDetails