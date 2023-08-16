import { ErrorResponse } from 'shared/interfaces/error-response'

import './error-container.style.scss'

type ErrorContainerProps = {
  error: ErrorResponse | null,
  customTextMessage?: string
}

const ErrorContainer = ({ error, customTextMessage }: ErrorContainerProps) => {
  
  const fetchErrorMessage = () => {

    if (customTextMessage && customTextMessage !== '') return customTextMessage

    if (error) return error.message || 'Something went wrong.'

    return null
  }
  
  return (
    <div className='error-message-container center error-color'>
      {fetchErrorMessage()}
    </div>
  )
}

export default ErrorContainer
