import React from "react"

import './error.style.scss'

const ErrorContainer = ({ errorMessage }) => (
  <div className='error-message-container center'>
    {errorMessage ? errorMessage : ''}
  </div>
)

export default ErrorContainer