import React, { ButtonHTMLAttributes } from 'react'

import './custom-button.style.scss'

type CustomButtonType = {
  children: string | JSX.Element | JSX.Element[],
  isGoogleSignIn?: boolean,
  inverted?: boolean,
  isDisabled?: boolean,
  additionalClasses?: string
  onClick?: (event: React.MouseEvent) => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = ({ 
  children, 
  isGoogleSignIn, 
  inverted, 
  isDisabled,
  additionalClasses, 
  ...otherProps 
} : CustomButtonType) => (
  <button
    className={`
      custom-button 
      ${isGoogleSignIn ? 'google-sign-in' : ''}
      ${inverted ? 'inverted' : ''} 
      ${additionalClasses}
      `}
    disabled={isDisabled}
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton