import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { selectCurrentUser } from '../../../redux/user/user.selectors'
import { selectCartTotal } from '../../../redux/cart/cart.selectors'
import { makePayment } from '../../../rest-api/payments'
// import { createOrder } from '../../rest-api/orders'
import { createOrderRequested } from '../../../redux/orders/orders.actions'

import CustomButton from '../../custom-components/custom-button/custom-button.component'

import './payment-form.style.scss'

const PaymentForm = () => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const currentUser = useSelector(selectCurrentUser)
  const total = useSelector(selectCartTotal)
  const amount = parseFloat((total * 100).toFixed())
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  
  // console.log({currentUser})
  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessingPayment(true)

    const responsePayment = await makePayment({ amount })
    console.log({responsePayment})

    const clientSecret = responsePayment.data.client_secret

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.fullName : 'Guest'
        }
      }
    })

    console.log({paymentResult})

    setIsProcessingPayment(false)

    if (paymentResult.error) {
      console.log('Payment error: ', paymentResult.error)
      alert('There was an issue with your payment. Please make sure you use the provided credit card.')
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        dispatch(createOrderRequested({ total }))
        alert('Payment succesfull.')
        // TODO alert to user to thank for successfully placed order
        // Message: CONGRATULATIONS!
        // Message: Your order has been placed.
        // Message: You can see details for current order in profile/orders (link to current order in profile?)
        // Button "Continue Shopping"
        // Message: "You will receive an email with tracking information once your goods have been shipped."
        // Email: Hey "Client_Name", Thanks so much for your purchase! ...
      }
    }
  }

  return (
    <div className='payment-form-container'>
      <div className='form-container'>
        <h2>Credit Card Payment:</h2>

        <CardElement />

        <CustomButton 
          isDisabled={isProcessingPayment} 
          onClick={paymentHandler} 
          inverted 
        >
          Pay now
        </CustomButton>

        <div className="test-warning">
          *Use the following test credit card for payments
          <br />
          4242 4242 4242 4242 - Exp: 04/24 - CVC: 244
        </div>
      </div>
      
    </div>
  )
}
 
export default PaymentForm