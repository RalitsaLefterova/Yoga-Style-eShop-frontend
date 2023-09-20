import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { CartProduct } from 'shared/types/products'
import { formatCurrency } from 'shared/helpers'
import { 
  addProductToCartRequested, 
  removeProductFromCartRequested,
  clearProductFromCartRequested
} from '../../../redux/cart/cart.actions'

import YogaStyleThumbnail from 'components/custom-components/yoga-style-thumbnail/yoga-style-thumbnail.component'

import './checkout-item.style.scss'

type CheckoutItemProps = {
  cartProduct: CartProduct
}

const CheckoutItem = memo(({ cartProduct }: CheckoutItemProps) => {
  const dispatch = useDispatch()
  const { id: productId, title, mainImageUrl, price, quantity } = cartProduct

  const handleAddToCart = () => {
    dispatch(addProductToCartRequested(productId))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCartRequested(productId))
  }

  const handleClearProductFromCart = () => {
    dispatch(clearProductFromCartRequested(productId))
  }
  
  return (
    <tr>
      <td className='product-description'>
        <div className='image-container'>
          <YogaStyleThumbnail image={mainImageUrl} />
        </div>
        <div className='title'>{title}</div>
      </td>
      <td>
        <div className='quantity'>
          <span className='arrow' onClick={handleRemoveFromCart}>&#10094;</span>
          <span className='value'>{quantity}</span>
          <span className='arrow' onClick={handleAddToCart}>&#10095;</span>
        </div>
      </td>
      <td>
        <span className='price'>{formatCurrency(price)}</span>
      </td>
      <td>
        <div className='remove-button' onClick={handleClearProductFromCart}>&#10005;</div>
      </td>
    </tr>
  )
})

export default CheckoutItem