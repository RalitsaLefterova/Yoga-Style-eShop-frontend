import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'


import CustomButton from '../custom-button/custom-button.component'
import CartProduct from '../cart-product/cart-product.component'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-dropdown.style.scss'

const CartDropdown = ({ cartProducts, history, toggleCartHidden }) => {
  // const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    toggleCartHidden()
    history.push('/checkout')
    //TODO hide cart dropdown
    // navigate('/checkout')
  }
  console.log({cartProducts})

  return (
    <div className="cart-dropdown-container">
      <div className="cart-products">
        {cartProducts ? cartProducts.map(product => 
          <CartProduct 
            key={product._id} 
            cartProduct={product} 
          />) : 'Your cart is empty'}
      </div>
      <CustomButton onClick={goToCheckoutHandler}>Go to checkout</CustomButton>
    </div>
  )
}

const mapStateToProps = state => ({
  cartProducts: state.cart.cartProducts
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown))