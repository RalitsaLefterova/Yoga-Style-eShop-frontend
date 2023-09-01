import React, { ButtonHTMLAttributes } from 'react'

import './yoga-style-button.style.scss'

type YogaStyleButtonProps = {
  children: string | JSX.Element | JSX.Element[],
  isGoogleSignIn?: boolean,
  inverted?: boolean,
  isDisabled?: boolean,
  extraClasses?: string,
  onClick?: (event: React.MouseEvent) => void 
} & ButtonHTMLAttributes<HTMLButtonElement>

const YogaStyleButton = ({
  children, 
  isGoogleSignIn, 
  inverted, 
  isDisabled,
  extraClasses, 
  ...otherProps
}: YogaStyleButtonProps) => (
  <button
    className={`
      yoga-style-button 
      ${isGoogleSignIn ? 'google-sign-in' : ''}
      ${inverted ? 'inverted' : ''} 
      ${extraClasses || ''}
      `}
    disabled={isDisabled}
    {...otherProps}
  >
    {children}
  </button>
)

export default YogaStyleButton