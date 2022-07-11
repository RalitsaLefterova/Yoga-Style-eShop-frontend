import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { signOutRequested } from '../../redux/user/user.actions'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import Logo from '../../assets/svgs/logo.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './header.style.scss'

const Header = ({ history }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const hidden = useSelector(selectCartHidden)

  const handleLogoutUser = () => dispatch(signOutRequested({ history }))

  return (
    <Fragment>
      <div className='header'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          <Link className='nav-link' to='/about-us'>ABOUT US</Link>
          {currentUser ? (
            <Fragment>
              <Link className='nav-link' to='/profile'>PROFILE</Link>
              <div className="nav-link" onClick={handleLogoutUser}>SIGN OUT</div>
              <CartIcon />
            </Fragment>
          ) : (
            <Link className='nav-link' to='/sign-in'>SIGN IN</Link>
          )}
        </div>
      </div>
      { !hidden && <CartDropdown /> }
    </Fragment>
  )
}

export default withRouter(Header)