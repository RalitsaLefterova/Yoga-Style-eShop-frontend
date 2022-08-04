import React from 'react'
import { useDispatch } from 'react-redux'

import './order-item.style.scss'

const OrderItem = ({ orderInfo }) => {
  const dispatch = useDispatch()
  const { _id: orderId, createdAt, status, total } = orderInfo

  // TODO not here! move it in order details component
  const getOrderDetails = orderId => {
    // dispatch(getOrderDetailsRequested(orderId))
  }

  return (
    <tr>
      <td>{createdAt}</td>
      <td>{status}</td>
      <td>{total}</td>
      <td>
        <button onClick={() => getOrderDetails(orderId)}>details</button>
      </td>
    </tr>
  )
}

export default OrderItem