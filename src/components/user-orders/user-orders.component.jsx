import React from 'react'
import { useSelector } from 'react-redux'

import { selectOrders } from '../../redux/orders/orders.selectors'

import OrderItem from '../order-item/order-item.component'

import './user-orders.style.scss'

const UserOrders = () => {
const ordersList = useSelector(selectOrders)
console.log({ordersList})
  const orders = [
    {
      date: '12.03.2022',
      status: 'finished',
      total: 123
    },
    {
      date: '15.03.2022',
      status: 'In progress',
      total: 52
    }
  ]

  const ordersTableHeader = () => {
    const headerCellsName = ['Created', 'Status', 'Total', ' ']
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
        <OrderItem key={order._id} orderInfo={order} />
      )}
    </tbody>

  return (
    <>
    {orders.length === 0 ? 
      <div>no orders are placed yet</div> : 
      <table>
          {ordersTableHeader()}
          {ordersTableBody()}
      </table>
    }
    </>
  )
}

export default UserOrders