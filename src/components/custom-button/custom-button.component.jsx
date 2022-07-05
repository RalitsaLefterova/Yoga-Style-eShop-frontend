import React from 'react'

import './custom-button.style.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, isDisabled,  ...otherProps}) => (
  <button 
    className={`
      custom-button 
      ${isGoogleSignIn ? 'google-sign-in' : ''}
      ${inverted ? 'inverted' : ''}
      `}
    disabled={isDisabled}
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton