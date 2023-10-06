import { memo } from 'react'

import { formatCurrency } from 'shared/helpers'

import YogaStyleThumbnail from 'components/custom-components/yoga-style-thumbnail/yoga-style-thumbnail.component'
import RemoveIcon from '../../../assets/svgs/remove.svg'

import './sidebar-cart-item.style.scss'

type CartItemProps = {
  id: string,
  title: string,
  mainImageUrl: string,
  price: number,
  quantity: number
}

const SidebarCartItem = ({ id, title, mainImageUrl, price, quantity }: CartItemProps) => {

  return (
    <li id={id} className='sidebar-cart-item-container'>
      <div className='product-image'>
        <YogaStyleThumbnail image={mainImageUrl} />
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

export default memo(SidebarCartItem)