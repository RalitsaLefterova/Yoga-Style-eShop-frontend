import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import { formatCurrency, humanizeDate } from 'shared/helpers'
import { Order } from 'shared/types/orders'

import './user-order-item.style.scss'

type UserOrderItemProps = {
  orderInfo: Order,
  handleOpenOrderDetails: (orderId: string) => void
}

const UserOrderItem = ({ orderInfo, handleOpenOrderDetails }: UserOrderItemProps) => {
  const { _id: orderId, createdAt, status, total } = orderInfo

  return (
    <tr>
      <td>{humanizeDate(createdAt)}</td>
      <td>{status}</td>
      <td>{formatCurrency(total)}</td>
      <td>
        <div className='view-order-details-btn-box'>
          <CustomButton onClick={() => handleOpenOrderDetails(orderId)} additionalClasses='view-order-details-btn'>view details</CustomButton>
        </div>
      </td>
    </tr>
  )
}

export default UserOrderItem