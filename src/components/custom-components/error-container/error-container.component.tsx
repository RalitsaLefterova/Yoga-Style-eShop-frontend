import { AxiosError } from 'axios'
import './error-container.style.scss'

type ErrorContainerProps = {
  error: Error | null,
  customTextMessage?: string
}

const ErrorContainer = ({ error, customTextMessage }: ErrorContainerProps) => {
  
  const fetchErrorMessage = () => {

    if (customTextMessage && customTextMessage !== '') return customTextMessage

    // console.log('error instanceof Error', error instanceof Error)
    // console.log('error instanceof AxiosError', error instanceof AxiosError)
    // console.log('error?.response?.data', error?.response?.data)

    // if (error?.response && error.response.data) return error?.response.data

    if (error instanceof Error) return error.message
    // const errorMessage = (error as Error).message || 'Something went wrong.'

    return null
  }
  
  return (
  <div className='error-message-container center error-color'>
    {fetchErrorMessage()}
  </div>
)}

export default ErrorContainer