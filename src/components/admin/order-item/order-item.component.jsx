import { Link, useLocation } from 'react-router-dom'

import './order-item.style.scss'

const OrderItem = ({ orderInfo }) => {
  const { pathname } = useLocation()
  const { _id: orderId, createdAt, owner, status } = orderInfo
  const { _id: ownerId, fullName } = owner || {}

  return (
    <tr>
      <td>{createdAt}</td>
      {/* TODO: link to client details */}
      <td>{fullName}</td>
      <td>{status}</td>
      <td>
        <Link to={`${pathname}/${orderId}`}>details</Link>
      </td>
    </tr>
  )
}

export default OrderItem