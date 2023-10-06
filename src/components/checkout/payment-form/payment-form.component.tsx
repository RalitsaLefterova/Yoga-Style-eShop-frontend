import { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'

import { selectCurrentUser } from '../../../redux/user/user.selectors'
import { selectCartTotal } from '../../../redux/cart/cart.selectors'
import { makePaymentIntent } from '../../../rest-api/payments'
import { createOrderRequested } from '../../../redux/orders/orders.actions'
import { selectIsLoading, selectPaymentError } from 'redux/orders/orders.selectors'
import { formatCurrency } from 'shared/helpers'

import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './payment-form.style.scss'

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null

type PaymentFormProps = {
  handleGoToNextStep: () => void
}

const PaymentForm = ({ handleGoToNextStep }: PaymentFormProps) => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const currentUser = useSelector(selectCurrentUser)
  const total = useSelector(selectCartTotal)
  const amount = parseFloat((total * 100).toFixed())
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const isLoading = useSelector(selectIsLoading)
  const paymentError = useSelector(selectPaymentError)
  const [error, setError] = useState('')

  const appearance = {
    theme: 'stripe'
  }
  
  
  const paymentHandler = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsProcessingPayment(true)

    const responsePaymentIntent = await makePaymentIntent({ amount })
    console.log({responsePaymentIntent})

    const clientSecret = responsePaymentIntent.data.client_secret

    const cardDetails = elements.getElement(CardElement)
    if (!ifValidCardElement(cardDetails)) return

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.fullName : 'Guest'
        }
      }
    })

    console.log({paymentResult})

    setIsProcessingPayment(false)

    if (paymentResult.error) {
      console.log('Payment error: ', paymentResult.error, paymentResult.error.message)
      setError('There was an issue with your payment. ' + paymentResult.error.message)
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        dispatch(createOrderRequested({ total }))
        handleGoToNextStep()
        setError('')
        // alert('Payment succesfull.')
        //TODO: replace alerts with apropriate message for the user!!!       
      }
    }
  }

  console.log({total})

  return (
    // TODO: Add 'paymentError' in the orders' state; Move the payment functionality otside the component;
    <div className='payment-form-container'>
      <div className='form-container'>
        {/* <h2>Credit Card Payment:</h2> */}

        <div className="test-warning">
          *Use the following test credit card for payments
          <br />
          4242 4242 4242 4242 - Exp: 04/24 - CVC: 244
        </div>

        <div className="card-element-container">
          <label className="card-element-label">Card Details</label>
          <CardElement className="StripeElement" />
          {error && <ErrorContainer customTextMessage={error} extraClasses='card-element-error' />}
        </div>

        <div className='payment-button-wrapper'>
          <YogaStyleButton
            isDisabled={isProcessingPayment}
            onClick={paymentHandler}
          >
            {`Pay now ${formatCurrency(total)}`}
          </YogaStyleButton>
        </div>

      </div>
      
    </div>
  )
}
 
export default PaymentForm