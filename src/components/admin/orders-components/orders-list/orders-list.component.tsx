import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectOrders } from '../../../../redux/orders/orders.selectors'
import { getOrdersRequested } from '../../../../redux/orders/orders.actions'

import OrderItem from '../order-item/order-item.component'

import './orders-list.style.scss'
import { Order } from 'shared/types/orders'

const OrdersList = () => {
  const dispatch = useDispatch()
  const orders: Order[] = useSelector(selectOrders)

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
      {orders && orders.map(order => 
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
    <div className="admin-page-container center">
      <div className='page-title left'>
        <h1>Manage orders</h1>
      </div>
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

export default OrdersList