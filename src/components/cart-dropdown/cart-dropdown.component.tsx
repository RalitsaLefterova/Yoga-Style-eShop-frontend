import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartProducts } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/custom-button.component'
import CartProduct from '../cart-product/cart-product.component'

import './cart-dropdown.style.scss'

type CartProductsType = {
  id: string,
  title: string,
  mainImageUrl: string,
  price: number,
  quantity: number
}

const CartDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartProducts: CartProductsType[] = useSelector(selectCartProducts)
  
  const toggleIsCartHidden = () => dispatch(toggleCartHidden())

  const goToCheckoutHandler = useCallback(() => {
    toggleIsCartHidden()
    navigate('/checkout')
  }, [])

  return (
    <div className="cart-dropdown-container">
      <div className="cart-products">
        {cartProducts.length > 0 ? 
          cartProducts.map((product) => 
            <CartProduct 
              key={product.id}
              id={product.id}
              title={product.title}
              mainImageUrl={product.mainImageUrl}
              price={product.price}
              quantity={product.quantity}
            />
            ) : (
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

export default CartDropdown