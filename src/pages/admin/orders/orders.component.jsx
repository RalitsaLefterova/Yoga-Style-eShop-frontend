import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectOrders } from '../../../redux/orders/orders.selectors'
import { getOrdersRequested } from '../../../redux/orders/orders.actions'

import OrderItem from '../../../components/admin/order-item/order-item.component'

import './orders.style.scss'

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)

  const ordersTableHeader = () => {
    const headerCellsName = ['Order date', 'Client', 'Status',' ']
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
      {orders.map(order => 
        <OrderItem 
          key={order._id}
          orderInfo={order}
        />)}
    </tbody>

  useEffect(() => {
    dispatch(getOrdersRequested())
  }, [])
  console.log(orders)
  return (
    <div className="center">
      <Link to='/admin'>Back to admin home</Link>
      <div>
        {orders.length === 0 ?
          <div>No orders are placed yet.</div>
        :
          <table>
            {ordersTableHeader()}
            {ordersTableBody()}
          </table>
        }
      </div>
    </div>
  )
}

export default Orders