import React from 'react'


import './user-order-item.style.scss'

const UserOrderItem = ({ orderInfo, handleOpenOrderDetails }) => {
  
  const { _id: orderId, createdAt, status, total } = orderInfo

  return (
    <tr>
      <td>{createdAt}</td>
      <td>{status}</td>
      <td>{total}</td>
      <td>
        <button onClick={() => handleOpenOrderDetails(orderId)}>details</button>
      </td>
    </tr>
  )
}

export default UserOrderItem