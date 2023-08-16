import axios, { AxiosError } from 'axios'

import { ErrorResponse } from 'shared/interfaces/error-response'

export const handleRequestError = (error: unknown): ErrorResponse => {
  console.log('in RequestErrorHandler', {error})

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>
    return {
      message: axiosError.response?.data?.message || 'An unknown error occurred',
      details: axiosError.response?.data?.details || {},
      name: error.name
    };
  } else if (typeof error === 'string') {
    return {
      message: error,
      name: 'Custom error'
    };
  }

  return {
    message: 'An unknown error occurred',
    name: 'Custom error'
  }
}