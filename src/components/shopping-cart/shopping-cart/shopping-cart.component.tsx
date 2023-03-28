import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CartProduct } from 'shared/types/products'
import { selectCartHidden, selectCartProducts, selectCartTotal } from 'redux/cart/cart.selectors'
import { toggleCartHidden } from 'redux/cart/cart.actions'
import { formatCurrency } from 'shared/helpers'

import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

import './shopping-cart.style.scss'

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartProducts: CartProduct[] = useSelector(selectCartProducts)
  const cartTotal = useSelector(selectCartTotal)
  const hidden = useSelector(selectCartHidden)

  const toggleIsCartHidden = () => dispatch(toggleCartHidden())

  const goToCheckoutHandler = useCallback(() => {
    toggleIsCartHidden()
    navigate('/checkout')
  }, [])

  return (
    <div className={`shopping-cart-wrapper ${hidden ? '' : 'is-visible'}`}>
      <div className={`shopping-cart-container `}>
        <h2>Cart</h2>
        <ul className='cart-items'>
          {cartProducts.length > 0 ? 
            cartProducts.map(product => 
              <CartItem 
                key={product.id}
                id={product.id}
                title={product.title}
                mainImageUrl={product.mainImageUrl}
                price={product.price}
                quantity={product.quantity}
              />
            ) : (
                <span className='empty-message'>'Your cart is empty'</span>
            )
          }
        </ul>
        <div className='cart-total'>
          <span>Total</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>

      </div>
    </div>
  )

}

export default ShoppingCart