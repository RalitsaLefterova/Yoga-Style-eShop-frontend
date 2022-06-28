
import React from 'react'
import { connect } from 'react-redux'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import ShoppingIcon from '../../assets/svgs/shopping-bag.svg'

import './cart-icon.style.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon-container' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
      <span className='product-count'>{itemCount}</span>
    </div>
  )

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null, mapDispatchToProps)(CartIcon)