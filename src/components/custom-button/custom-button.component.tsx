import React from 'react'

import './custom-button.style.scss'

type CustomButtonType = {
  buttonType?: 'submit' | 'reset' | 'button' | undefined,
  children: string,
  isGoogleSignIn?: boolean,
  inverted?: boolean,
  isDisabled?: boolean,
  onClick?: (e: React.MouseEvent) => void
}

const CustomButton = ({ children, isGoogleSignIn, inverted, isDisabled, buttonType, ...otherProps } : CustomButtonType) => (
  <button 
    type={buttonType}
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