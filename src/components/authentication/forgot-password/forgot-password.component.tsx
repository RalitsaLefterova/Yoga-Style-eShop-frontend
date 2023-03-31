import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { forgotPasswordRequested } from '../../../redux/user/user.actions'
import { selectIsResetPasswordLinkSent, selectErrorOnForgotPassword } from '../../../redux/user/user.selectors'

import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './forgot-password.style.scss'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const isResetPasswordLinkSent = useSelector(selectIsResetPasswordLinkSent)
  const errorOnForgotPassword = useSelector(selectErrorOnForgotPassword)
  const dispatch = useDispatch()

  console.log({isResetPasswordLinkSent})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(forgotPasswordRequested(email))
  }

  return (
    <div className='forgot-password-container'>
      {isResetPasswordLinkSent ? (
        <span>Reset password link was sent to your email.</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Forgot password</h3>
          <span>Please provide the email you are curently registered with. We will send you a reset password link.</span>
          <CustomInput
            type='email'
            field='email'
            label='Email'
            onChangeHandler={handleChange}
            value={email}
            required
          />
          {errorOnForgotPassword && <ErrorContainer error={errorOnForgotPassword} />}
          <CustomButton type='submit'>Send reset link</CustomButton>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword