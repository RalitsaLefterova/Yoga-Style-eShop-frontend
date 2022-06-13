import React from "react"

import './error-message.style.scss'

const ErrorContainer = ({ errorMessage }) => (
  <div className='error-message-container center'>
    {errorMessage ? errorMessage : ''}
  </div>
)

export default ErrorContainer