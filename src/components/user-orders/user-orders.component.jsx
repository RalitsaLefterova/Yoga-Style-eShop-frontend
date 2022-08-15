import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectOrders } from '../../redux/orders/orders.selectors'

import OrderItem from '../order-item/order-item.component'
import OrderDetails from '../order-details/order-details.component'

import './user-orders.style.scss'

const UserOrders = () => {
const ordersList = useSelector(selectOrders)
const [selectedOrderId, setSelectedOrderId] = useState(null)
const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

const openOrderDetails = orderId => {
  setSelectedOrderId(orderId)
  setIsOrderDetailsOpen(true)
}

const closeOrderDetails = () => {
  setIsOrderDetailsOpen(false)
}

  const ordersTableHeader = () => {
    const headerCellsName = ['Order date', 'Status', 'Total', ' ']
    return (
      <thead>
        <tr>
          {headerCellsName.map((cellName, index) => (
            <td key={index}>
              <span>{cellName}</span>
            </td>
          ))}
        </tr>
      </thead>
    )
  }

  const ordersTableBody = () => 
    <tbody>
      {ordersList.map(order => 
        <OrderItem 
          key={order._id} 
          orderInfo={order} 
          handleOpenOrderDetails={openOrderDetails}
        />
      )}
    </tbody>

  return (
    <>
    {ordersList.length === 0 ? 
      <div>
        No orders are placed yet. 
        <Link to='/shop'>Start shopping.</Link>
      </div> 
      : 
      isOrderDetailsOpen ? (
        <OrderDetails 
        orderId={selectedOrderId}
        handleBackToOrdersList={closeOrderDetails} 
      />
      ) : (
        <table>
          {ordersTableHeader()}
          {ordersTableBody()}
        </table>
      )
    }
    </>
  )
}

export default UserOrders