import React from 'react'
import { connect, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Wrapper from '../wrapper'
import Logo from '../../assets/svgs/logo.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { logout } from '../../rest-api/users'
import { signOutSuccess, signOutFailure } from '../../redux/user/user.actions'
import { selectCartHidden } from '../../redux/cart/cart.selectors'

import './header.style.scss'

const Header = ({ currentUser, signOutSuccess, signOutFailure, history }) => {
  const hidden = useSelector(selectCartHidden)

  const handleLogoutUser = () => {
    logout().then(response => {
      if (response.status === 200) {
        history.push('/sign-in')
        signOutSuccess()
      }
    }).catch(error => {
      signOutFailure(error)
    })
  }

  return (
    <Wrapper>
      <div className='header'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          <Link className='nav-link' to='/about-us'>ABOUT US</Link>
          {currentUser ? (
            <Wrapper>
              <Link className='nav-link' to='/profile'>PROFILE</Link>
              <div className="nav-link" onClick={handleLogoutUser}>SIGN OUT</div>
              <CartIcon />
            </Wrapper>
          ) : (
            <Link className='nav-link' to='/sign-in'>SIGN IN</Link>
          )}
        </div>
      </div>
      { !hidden && <CartDropdown /> }
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  // hidden: state.cart.hidden
})

const mapDispatchToProps = dispatch => ({
  signOutSuccess: () => dispatch(signOutSuccess()),
  signOutFailure: error => dispatch(signOutFailure(error))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))