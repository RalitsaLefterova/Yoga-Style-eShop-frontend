import CustomImageContainer from 'components/custom-components/custom-image-container/custom-image-container.component'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { formatCurrency, humanizeDate } from 'shared/helpers'
import { Address } from 'shared/types/addresses'
import { Order } from 'shared/types/orders'
import { getOrderDetailsRequested } from '../../../redux/orders/orders.actions'
import { selectSelectedOrderDetails } from '../../../redux/orders/orders.selectors'

import './user-order-details.style.scss'

type UserOrderDetailsProps = {
  orderId: string,
  handleBackToOrdersList: () => void
}

const UserOrderDetails = ({ orderId, handleBackToOrdersList }: UserOrderDetailsProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const order: Order = useSelector(selectSelectedOrderDetails)
  const { createdAt, delivery_address, products, status, total } = order || {}
  const { city, postalCode, street, country }: Address = delivery_address || {}

  const goToProduct = (productId: string, collectionId: string) => {
    navigate(`/shop/${collectionId}/${productId}`)
    // /shop/bags-and-backpacks/62937e4954f82c04cc98da8c
  }

  useEffect(() => {
    dispatch(getOrderDetailsRequested(orderId))
  }, [])

  return (
    <div className='order-details-container'>
      <div className='back-btn' onClick={handleBackToOrdersList} >
        <FontAwesomeIcon icon={faAngleLeft} />
        Go back to orders list
      </div>

      <div className='center uppercase-text'>Order details</div>

      <div className='order-details'>
        <div className='order-details-row'>
          <span>Order date: </span>
          <span>{humanizeDate(createdAt)}</span>
        </div>
        <div className='order-details-row'>
          <span>Status:</span>
          <span>{status}</span>
        </div>
        <div className='order-details-row'>
          <span>Delivery address:</span>
          <span>{street}, {city} {postalCode}, {country}</span>
        </div>
        <div className='order-details-row'>
          <span>Total:</span> 
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <div className='product-details-container'>
        <div className='title center'>Order Items:</div>
        {(products || []).map((productItem, index) => {
          const { product, quantity } = productItem
          const { _id: productId, title, mainImageUrl, price, collectionId } = product
          return (
            <div className='product-details' key={index} onClick={() => goToProduct(productId, collectionId)}>
              <div className='product-image'>
                <CustomImageContainer image={mainImageUrl} />
              </div>
              <div className='product-title left'>{title}</div>
              <div className='product-price right'>{formatCurrency(price)}</div>
              <div className='product-quantity'>{quantity}</div>
            </div>
          )}
        )}
      </div>
    </div>
  )
}

export default UserOrderDetails