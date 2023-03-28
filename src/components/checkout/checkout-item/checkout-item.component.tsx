import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { CartProduct } from 'shared/types/products'
import { formatCurrency } from 'shared/helpers'
import { 
  addProductToCartRequested, 
  removeProductFromCartRequested,
  clearProductFromCartRequested
} from '../../../redux/cart/cart.actions'

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
    <div className='checkout-product-container'>
      <div className='image-container'>
        <img src={mainImageUrl} alt={title} />
      </div>
      <span className='title'>{title}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveFromCart}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddToCart}>&#10095;</div>
      </span>
      <span className='price'>{formatCurrency(price)}</span>
      <div className='remove-button' onClick={handleClearProductFromCart}>&#10005;</div>
    </div>
  )
})

export default CheckoutItem