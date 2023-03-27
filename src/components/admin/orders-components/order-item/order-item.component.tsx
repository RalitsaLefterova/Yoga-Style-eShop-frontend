import { Link, useLocation } from 'react-router-dom'

import { humanizeDate } from 'shared/helpers'
import { Order } from 'shared/types/orders'

import './order-item.style.scss'

type OrderItemType = {
  orderInfo: Order
}

const OrderItem = ({ orderInfo }: OrderItemType) => {
  const { pathname } = useLocation()
  const { _id: orderId, createdAt, owner, status } = orderInfo
  const { _id: ownerId, fullName } = owner || {}

  return (
    <tr>
      <td>{humanizeDate(createdAt)}</td>
      <td><Link to={`/admin/users/${ownerId}`}>{fullName}</Link></td>
      <td>{status}</td>
      <td>
        <Link to={`${pathname}/${orderId}`}>details</Link>
      </td>
    </tr>
  )
}

export default OrderItem