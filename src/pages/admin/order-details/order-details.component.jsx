import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetailsRequested } from '../../../redux/orders/orders.actions'
import { selectOrderDetails } from '../../../redux/orders/orders.selectors'

import './order-details.style.scss'

const OrderDeatils = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const order = useSelector(selectOrderDetails)
  const { createdAt, owner, delivery_address, products, status, total } = order
  const { city, postalCode, street, country } = delivery_address || {}
  const { _id: ownerId, fullName } = owner || {}

  useEffect(() => {
    dispatch(getOrderDetailsRequested(params.id))
  }, [])

  return (
    <>
    <div>link here: Go Back</div>
    <div>
        <div>Order date: {createdAt}</div>
        {/* TODO link to client details */}
        <div>Client: {fullName}</div>
        <div>Delivery address: {street}, {city} {postalCode}, {country}</div>
        <div>Total: {total}</div>
      </div>
      <div>
        <span>Status: {status}</span>
        <button>Change status</button>
      </div>
      {(products || []).map((productItem, index) => {
        const { product, quantity} = productItem
        return (
          <div className='product-details-container' key={index}>
            <div><img src={product.mainImageUrl} /></div>
            <div>{product.title}</div>
            <div>{product.price}</div>
            <div>{quantity}</div>
          </div>
        )}
      )}
    </>
  )
}

export default OrderDeatils