import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams, Link } from 'react-router-dom' 

import { resetPasswordRequested } from 'redux/user/user.actions'
import { selectIsResetPasswordSuccessfull, selectErrorOnResetPassword } from 'redux/user/user.selectors'

import FormInput from 'components/form-input/form-input.component'
import CustomButton from 'components/custom-button/custom-button.component'
import ErrorContainer from 'components/error-message/error-message.component'

import './reset-password.style.scss'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get('user')
  const resetToken = searchParams.get('token')
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errorPasswordsDoNotMatch, setErrorPasswordsDoNotMatch] = useState('')
  const isResetPasswordSuccessfull = useSelector(selectIsResetPasswordSuccessfull)
  const errorOnResetPassword = useSelector(selectErrorOnResetPassword)
  const { password, confirmPassword } = passwords
  
  console.log({isResetPasswordSuccessfull})
  const handleChange = event => {
    setErrorPasswordsDoNotMatch('')
    const { name, value } = event.target
    setPasswords({...passwords,  [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorPasswordsDoNotMatch('Passwords do not match')
      return;
    }

    dispatch(resetPasswordRequested({ userId, resetToken, password }))
  }

  return (
    <div className='reset-password-container'>
      {isResetPasswordSuccessfull ? (
        <div className='center'>
          <p>Your password was successfully changed.</p>
          <p>Go to <Link to='/sign-in'>login</Link>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <FormInput
            type='password'
            name='password'
            defaultValue={password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            defaultValue={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          {errorPasswordsDoNotMatch && <ErrorContainer errorMessage={errorPasswordsDoNotMatch} />}
          {errorOnResetPassword && <ErrorContainer errorMessage={errorOnResetPassword} />}
          <CustomButton type='submit'>Reset Password</CustomButton>
        </form>
      )}
    </div>
  )
}

export default ResetPassword