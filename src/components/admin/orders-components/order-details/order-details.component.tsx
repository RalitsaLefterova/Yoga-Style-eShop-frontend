/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getOrderDetailsRequested } from '../../../../redux/orders/orders.actions'
import { selectOrderDetails } from '../../../../redux/orders/orders.selectors'
import { humanizeDate } from 'shared/helpers'
import { Order } from 'shared/types/orders'

import './order-details.style.scss'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const order: Order = useSelector(selectOrderDetails)
  const { _id: orderId, createdAt, owner, delivery_address, products, status, total } = order
  const { city, postalCode, street, country } = delivery_address || {}
  const { _id: ownerId, fullName } = owner || {}

  useEffect(() => {
    dispatch(getOrderDetailsRequested(params.id))
  }, [])

  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Order Details</h1>
      </div>
      <div className='left'>
        <Link to='/admin/orders'>Back to Orders</Link>
      </div>
      <div className='order-details-container left'>
        <div>Order ID: {orderId}</div>
        <div>Order date: {humanizeDate(createdAt)}</div>
        {/* TODO link to client details */}
        <div>Client: <Link to={`/admin/users/${ownerId}`}>{fullName}</Link></div>
        <div>Delivery address: {street}, {city} {postalCode}, {country}</div>
        <div>Total: {total}</div>
        <div>
          <span>Status: {status}</span>
          <button>Change status</button>
        </div>
      </div>
      <div className='products-list-container'>
        {(products || []).map((productItem, index) => {
          const { product, quantity} = productItem
          const { mainImageUrl, title, price } = product
          return (
            <div className='product-details-container' key={index}>
              <div><img src={`${process.env.BACKEND_URL}/${mainImageUrl}`} /></div>
              <div>{title}</div>
              <div>{price}</div>
              <div>{quantity}</div>
            </div>
          )}
        )}
      </div>
    </div>
  )
}

export default OrderDetails