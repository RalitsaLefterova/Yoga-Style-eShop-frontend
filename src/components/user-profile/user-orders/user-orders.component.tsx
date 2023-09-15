import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectOrders } from '../../../redux/orders/orders.selectors'

import UserOrderItem from '../user-order-item/user-order-item.component'
import UserOrderDetails from '../user-order-details/user-order-details.component'

import './user-orders.style.scss'
import { Order } from 'shared/types/orders'

const UserOrders = () => {
  const ordersList: Order[] = useSelector(selectOrders)
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

  const openOrderDetails = (orderId: string) => {
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
        <UserOrderItem 
          key={order._id} 
          orderInfo={order} 
          handleOpenOrderDetails={openOrderDetails}
        />
      )}
    </tbody>

  return (
    <div className='user-orders-container'>
    {ordersList.length === 0 ? 
      <div className='no-orders-message-box'>
        <span>No orders are placed yet.</span>
        <Link to='/shop'> &gt;&gt; Start shopping &lt;&lt; </Link>
      </div> 
      : 
      isOrderDetailsOpen ? (
        <UserOrderDetails 
          orderId={selectedOrderId}
          handleBackToOrdersList={closeOrderDetails} 
        />
      ) : (
        <div className='orders-list-container'>
          <table>
            {ordersTableHeader()}
            {ordersTableBody()}
          </table>
        </div>
      )
    }
    </div>
  )
}

export default UserOrders