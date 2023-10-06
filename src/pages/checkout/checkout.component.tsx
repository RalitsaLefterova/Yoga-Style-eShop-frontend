import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { 
  selectCurrentUser, 
  selectCurrentUserShippingAddress, 
  selectErrorOnGetShippingAddress 
} from 'redux/user/user.selectors'
import { getCurrentUserShippingAddressRequested } from 'redux/user/user.actions'
import { isNotEmptyObject } from 'shared/helpers'
import { Address } from 'shared/types/addresses'

import MultistepProgressBar from 'components/checkout/multistep-progress-bar/multistep-progress-bar.component'
import Shipping from 'components/checkout/shipping/shipping.component'
import PaymentForm from 'components/checkout/payment-form/payment-form.component'
import CompletedOrder from 'components/checkout/completed-order/completed-order.component'

import './checkout.style.scss'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const shippingAddress = useSelector(selectCurrentUserShippingAddress)
  const errorOnGetShippingAddress = useSelector(selectErrorOnGetShippingAddress)

  const steps = [
    {
      label: 'Shipping',
      step: 1
    },
    {
      label: 'Payment',
      step: 2
    },
    {
      label: 'Finish',
      step: 3
    }
  ]

  const totalSteps = steps.length

  const [activeStep, setActiveStep] = useState(1)

  const handleChangeNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const handleChangePrevStep = () => {
    setActiveStep(activeStep - 1)
  }

  console.log({currentUser}, {shippingAddress}, {activeStep})

  useEffect(() => {
    dispatch(getCurrentUserShippingAddressRequested())
  }, [])

  return (
    <div className='checkout-page-container'>
      <MultistepProgressBar activeStep={activeStep} steps={steps} />

      <div className='checkout-steps-pages'>
        {
          {
            1: <Shipping shippingAddress={shippingAddress} error={errorOnGetShippingAddress} />,
            2: <PaymentForm handleGoToNextStep={handleChangeNextStep} />,
            3: <CompletedOrder clientName={currentUser?.fullName} />
          }[activeStep]
        }
      </div>
      <div className="buttons-container">
        <div>
          {activeStep === 2 ? 
            <button 
              className="button-style" 
              onClick={handleChangePrevStep}
            >
            Back to shipping
            </button>
          :
            null
          }
        </div>
        <div>
          {activeStep === 1 ?
            <button 
              className="button-style" 
              onClick={handleChangeNextStep} 
              disabled={!shippingAddress || !isNotEmptyObject(shippingAddress)}
            >
              Continue to payment
            </button>
          :
            null
          }
        </div>
        
      </div>
    </div>
  )
}

export default CheckoutPage