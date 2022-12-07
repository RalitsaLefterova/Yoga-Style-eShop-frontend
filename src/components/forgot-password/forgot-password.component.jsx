import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { forgotPasswordRequested } from '../../redux/user/user.actions'
import { selectIsResetPasswordLinkSent } from '../../redux/user/user.selectors'

import FormInput from 'components/form-input/form-input.component'
import CustomButton from 'components/custom-button/custom-button.component'

import './forgot-password.style.scss'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const isResetPasswordLinkSent = useSelector(selectIsResetPasswordLinkSent)
  const dispatch = useDispatch()

  console.log({isResetPasswordLinkSent})
  const handleChange = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(forgotPasswordRequested({ email }))
  }

  return (
    <div className='forgot-password-container'>
      {isResetPasswordLinkSent ? (
        <span>Reset password link was sent to your email.</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Forgot password</h3>
          <span>Please provide the email you are curently registered with. We will send you a reset password link.</span>
          <FormInput
            name='email' 
            type='email'
            defaultValue={email} 
            handleChange={handleChange}
            label='Email'
            required
          />
          <CustomButton type='submit'>Send reset link</CustomButton>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword