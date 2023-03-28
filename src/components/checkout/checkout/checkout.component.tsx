import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartProducts, selectCartTotal } from '../../../redux/cart/cart.selectors'
import { formatCurrency } from 'shared/helpers'

import CheckoutItem from '../checkout-item/checkout-item.component'
import PaymentForm from '../payment-form/payment-form.component'

import './checkout.style.scss'
import { CartProduct } from 'shared/types/products'

const Checkout = () => {
  const cartProducts: CartProduct[] = useSelector(selectCartProducts)
  const total: number = useSelector(selectCartTotal)

  const chekoutTableHeader = () => {
    const headerCellsName = ['Product', 'Description', 'Quantity', 'Price', 'Remove']
    return (
      headerCellsName.map((cellName, index) => (
        <div className="header-block" key={index}>
          <span>{cellName}</span>
        </div>
      ))
    )
  }

  return (
    <div className='checkout-page-container'>
      <div className="checkout-header">
        {chekoutTableHeader()}
      </div>
      {cartProducts.length > 0 ? cartProducts.map(product => (
        <CheckoutItem
          key={product.id}
          cartProduct={product} />
      )) : (
        <>
          Your cart is empty. <Link to='/shop'>Start shopping.</Link>
        </>
      )}
      <div className="total">
        {/* TODO: get currency sign from util function */}
        Total price: {formatCurrency(total)}
      </div>
      <div>
        <PaymentForm />
      </div>
    </div>
  )
}


export default Checkout