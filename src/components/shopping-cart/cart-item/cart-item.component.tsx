import CustomImageContainer from 'components/custom-components/custom-image-container/custom-image-container.component'
import { memo } from 'react'

import { formatCurrency } from 'shared/helpers'

import RemoveIcon from '../../../assets/svgs/remove.svg'

import './cart-item.style.scss'

type CartItemProps = {
  id: string,
  title: string,
  mainImageUrl: string,
  price: number,
  quantity: number
}

const CartItem = ({ id, title, mainImageUrl, price, quantity }: CartItemProps) => {

  return (
    <li id={id} className='cart-item-container'>
      <div className='product-image'>
        <CustomImageContainer image={mainImageUrl} />
      </div>
      {/* <img src={mainImageUrl} alt={`${title}`} /> */}
      <div className='product-details'>
        <span className='title'>{title}</span>
        <span className='price'>{quantity} x {formatCurrency(price)}</span>
      </div>
      <div className='remove-item-btn'>
        <RemoveIcon />
      </div>
    </li>
  )
}

export default memo(CartItem)