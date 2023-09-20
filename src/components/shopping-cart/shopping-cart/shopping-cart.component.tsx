import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className={`shopping-cart-wrapper ${hidden ? '' : 'is-visible'}`} onClick={toggleIsCartHidden}>
      <div className={`shopping-cart-container `}>
        <h2>Cart</h2>
        {cartProducts.length > 0 ? (
          <>
            <ul className='cart-items'>
              {cartProducts.map(product => 
                <CartItem 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  mainImageUrl={product.mainImageUrl}
                  price={product.price}
                  quantity={product.quantity}
                />
              )}
            </ul>
            <div className='cart-total'>
              <span>Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <CustomButton onClick={goToCheckoutHandler} additionalClasses='checkout-btn'>
              Go to checkout
            </CustomButton>
          </>
        ) : (
          <div className='empty-message center'>
            <p>Your cart is empty.</p>
            <Link to='/shop' className='underline'>
              <strong>Start shopping.</strong>
            </Link>
          </div>
        )
        }
      </div>
    </div>
  )

}

export default ShoppingCart