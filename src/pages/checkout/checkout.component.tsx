import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartProducts, selectCartTotal } from 'redux/cart/cart.selectors'
import { CartProduct } from 'shared/types/products'
import { selectIsLoading } from 'redux/orders/orders.selectors'
import { formatCurrency } from 'shared/helpers'

import CheckoutItem from 'components/checkout/checkout-item/checkout-item.component'
import PaymentForm from 'components/checkout/payment-form/payment-form.component'

import './checkout.style.scss'

const CheckoutPage = () => {
  const cartProducts: CartProduct[] = useSelector(selectCartProducts)
  const total: number = useSelector(selectCartTotal)
  const isLoading = useSelector(selectIsLoading)

  return (
    <div className='checkout-page-container'>
      <table className='checkout-items-table'>
        <thead>
          <tr>
              <th>Product description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.length > 0 ? cartProducts.map(product => (
            <CheckoutItem
              key={product.id}
              cartProduct={product} />
          )) : (
            <tr>
              <td colSpan={4}>
                <div> 
                  Your cart is empty. 
                  <Link to='/shop' className='underline'>
                    <strong>Start shopping.</strong>
                  </Link>
                </div>    
              </td>
            </tr>
          )}
        </tbody>
    </table>
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

export default CheckoutPage