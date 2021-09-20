import React from 'react'
import { Link } from 'react-router-dom'

import './header.style.scss'

import Logo from '../../assets/svgs/logo.svg'

const Header = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>SHOP</Link>
      <Link className='option' to='/about-us'>ABOUT US</Link>
      <Link className='option' to='/profile'>PROFILE</Link>
      <Link className='option' to='/sign-in'>SIGN IN</Link>
      <Link className='option'>SIGN OUT</Link>
    </div>
  </div>
)

export default Header