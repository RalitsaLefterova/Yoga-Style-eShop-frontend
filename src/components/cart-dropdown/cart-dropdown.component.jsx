import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

import { selectCartProducts } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/custom-button.component'
import CartProduct from '../cart-product/cart-product.component'

import './cart-dropdown.style.scss'

const CartDropdown = ({ history }) => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartProducts = useSelector(selectCartProducts)
  const toggleIsCartHidden = () => dispatch(toggleCartHidden())

  const goToCheckoutHandler = () => {
    toggleIsCartHidden()
    history.push('/checkout')
    // navigate('/checkout')
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-products">
        {cartProducts.length > 0 ? 
          cartProducts.map(product => 
            <CartProduct 
              key={product.id} 
              cartProduct={product} 
            />) : (
            <span className='empty-message'>'Your cart is empty'</span>
            )
        }
      </div>
      <CustomButton 
        onClick={goToCheckoutHandler} 
        isDisabled={cartProducts.length === 0}
      >
          Go to checkout
      </CustomButton>
    </div>
  )
}

export default withRouter(CartDropdown)