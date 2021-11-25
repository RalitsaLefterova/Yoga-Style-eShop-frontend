import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './header.style.scss'

import Logo from '../../assets/svgs/logo.svg'

import { logout } from '../../rest-api/users'

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      <Link className='option' to='/about-us'>ABOUT US</Link>
      <Link className='option' to='/profile'>PROFILE</Link>
      {currentUser ? (
        <div className="option" onClick={logout}>SIGN OUT</div>
      ) : (
        <Link className='option' to='/sign-in'>SIGN IN</Link>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header)