import { ErrorResponse } from 'shared/interfaces/error-response'
import { StripeError } from '@stripe/stripe-js'

import './error-container.style.scss'

type ErrorContainerProps = {
  error?: ErrorResponse | StripeError | null,
  customTextMessage?: string,
  extraClasses?: string
}

const ErrorContainer = ({ error, customTextMessage, extraClasses }: ErrorContainerProps) => {
  
  console.log('in ErrorContainer: ', error)
  error && console.log('Error type: ', typeof error)

  const fetchErrorMessage = () => {

    if (customTextMessage && customTextMessage !== '') return customTextMessage

    if (error) return error.message || 'Something went wrong.'

    return null
  }
  
  return (
    <div className={`error-message-container error-color ${extraClasses}`}>
      {fetchErrorMessage()}
    </div>
  )
}

export default ErrorContainer
