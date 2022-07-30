import React from 'react'
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { makePayment } from '../../rest-api/payments'

import CustomButton from '../custom-button/custom-button.component'

import './payment-form.style.scss'

const PaymentForm = ({ amount }) => {
  const stripe = useStripe()
  const elements = useElements()
  const currentUser = useSelector(selectCurrentUser)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const responsePayment = await makePayment({ amount })
    console.log({responsePayment})

    const clientSecret = responsePayment.data.client_secret

    debugger

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser.fullName
        }
      }
    })

    console.log({paymentResult})
    debugger
    if (paymentResult.error) {
      alert(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('payment succesfull')
      }
    }
  }

  return (
    <div className='payment-form-container'>
      <div className='form-container'>
        <h2>Credit Card Payment:</h2>
        <div>
          <CardElement />
        </div>
        <CustomButton onClick={paymentHandler} inverted >Pay now</CustomButton>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments
        <br />
        4242 4242 4242 4242 - Exp: 04/24 - CVC: 244
      </div>
    </div>
  )
}
 
export default PaymentForm