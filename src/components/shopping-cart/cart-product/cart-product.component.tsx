import { memo } from 'react'

import './cart-product.style.scss'

type CartProductProps = {
  id: string,
  title: string,
  mainImageUrl: string,
  price: number,
  quantity: number
}

const CartProduct = ({ id, title, mainImageUrl, price, quantity }: CartProductProps) => {

  return (
    <div id={id} className='cart-product-container'>
      <img src={mainImageUrl} alt={`${title}`} />
      <div className='product-details'>
        <span className='title'>{title}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
}

export default memo(CartProduct)