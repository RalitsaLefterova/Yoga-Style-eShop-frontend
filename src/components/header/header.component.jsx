import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../assets/svgs/logo.svg'
import { logout } from '../../rest-api/users'
import { signOutSuccess, signOutFailure } from '../../redux/user/user.actions'

import './header.style.scss'

const Header = ({ currentUser, signOutSuccess, signOutFailure }) => {

  const handleLogoutUser = () => {
    logout().then(response => {
      if (response.status == 200) {
        signOutSuccess()
      }
    }).catch(error => {
      signOutFailure(error)
    })
  }

  return (
    <div className='header'>
      {console.log({ currentUser })}
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='nav-links-container'>
        <Link className='nav-link' to='/shop'>SHOP</Link>
        <Link className='nav-link' to='/about-us'>ABOUT US</Link>
        <Link className='nav-link' to='/profile'>PROFILE</Link>
        {currentUser ? (
          <div className="nav-link" onClick={handleLogoutUser}>SIGN OUT</div>
        ) : (
          <Link className='nav-link' to='/sign-in'>SIGN IN</Link>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  signOutSuccess: () => dispatch(signOutSuccess()),
  signOutFailure: error => dispatch(signOutFailure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)