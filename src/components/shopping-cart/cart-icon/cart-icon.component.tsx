
import { useDispatch, useSelector } from 'react-redux'

import { selectCartProductsCount } from '../../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../../redux/cart/cart.actions'

import ShoppingIcon from '../../../assets/svgs/shopping-bag.svg'

import './cart-icon.style.scss'

const CartIcon = () => {
  const dispatch = useDispatch()
  const cartCount: number = useSelector(selectCartProductsCount)
  
  const toggleIsCartHidden = () => dispatch(toggleCartHidden())

  return (
    <div className='cart-icon-container' onClick={toggleIsCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='product-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon