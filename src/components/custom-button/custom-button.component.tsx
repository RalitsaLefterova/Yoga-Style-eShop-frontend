import React, { ButtonHTMLAttributes } from 'react'

import './custom-button.style.scss'

type CustomButtonType = {
  children: string,
  isGoogleSignIn?: boolean,
  inverted?: boolean,
  isDisabled?: boolean,
  onClick?: (event: React.MouseEvent) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({ 
  children, 
  isGoogleSignIn, 
  inverted, 
  isDisabled, 
  ...otherProps 
} : CustomButtonType) => (
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