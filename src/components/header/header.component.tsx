import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { signOutRequested } from '../../redux/user/user.actions'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import Logo from '../../assets/svgs/yoga-style-logo.svg'
import CartIcon from '../shopping-cart/cart-icon/cart-icon.component'
import ShoppingCartSidebar from 'components/shopping-cart/shopping-cart-sidebar/shopping-cart-sidebar.component'

import './header.style.scss'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const hidden = useSelector(selectCartHidden)

  const handleLogoutUser = () => dispatch(signOutRequested(navigate))

  return (
    <header className='header'>
      <Link className='logo-container' to='/' aria-label='Yoga Style eShop'>
        <Logo className='logo' />
      </Link>

      <div className='menu-container'>

        <input id='menu-toggle' className='menu-toggle' type='checkbox' />
        <label className='menu-button-container' htmlFor='menu-toggle'>
          <div className='menu-button' />
        </label>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/'>HOME</Link>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          <Link className='nav-link' to='/about-us'>ABOUT US</Link>
          {currentUser ? ( 
            <>
              <Link className='nav-link' to='/profile'>PROFILE</Link>
              {/* {currentUser.role === 'ADMIN' && <Link className='nav-link' to='/admin'>ADMIN</Link>} */}
              <div className="nav-link" onClick={handleLogoutUser}>SIGN OUT</div>
            </>
          ) : (
            <Link className='nav-link' to='/sign-in'>SIGN IN</Link>
          )}
        </div>
        {currentUser && <CartIcon />}

      </div>

    <ShoppingCartSidebar />
    </header>
  )
}

export default Header