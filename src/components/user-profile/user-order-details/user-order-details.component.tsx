import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { formatCurrency, humanizeDate } from 'shared/helpers'
import { Address } from 'shared/types/addresses'
import { Order } from 'shared/types/orders'
import { getOrderDetailsRequested } from '../../../redux/orders/orders.actions'
import { selectOrderDetails } from '../../../redux/orders/orders.selectors'

import './user-order-details.style.scss'

type UserOrderDetailsProps = {
  orderId: string,
  handleBackToOrdersList: () => void
}

const UserOrderDetails = ({ orderId, handleBackToOrdersList }: UserOrderDetailsProps) => {
  const dispatch = useDispatch()
  const order: Order = useSelector(selectOrderDetails)
  const { createdAt, delivery_address, products, status, total } = order
  const { city, postalCode, street, country }: Address = delivery_address

  useEffect(() => {
    dispatch(getOrderDetailsRequested(orderId))
  }, [])

  return (
    <>
      <button onClick={handleBackToOrdersList}>
        Go back to orders list
      </button>  

      <div>
        <div>Order date: <span>{humanizeDate(createdAt)}</span></div>
        <div>Status: <span>{status}</span></div>
        <div>Delivery address: {street}, {city} {postalCode}, {country}</div>
        <div>Total: <span>{formatCurrency(total)}</span></div>
      </div>
      <div>
        {(products || []).map((productItem, index) => {
          const { product, quantity } = productItem
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
      </div>
    </>
  )
}

export default UserOrderDetails