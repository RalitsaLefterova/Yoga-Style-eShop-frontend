import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams, Link } from 'react-router-dom' 

import { resetPasswordRequested } from 'redux/user/user.actions'
import { selectIsResetPasswordSuccessfull, selectErrorOnResetPassword } from 'redux/user/user.selectors'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorPasswordsDoNotMatch('')
    const { name, value } = event.target
    setPasswords({...passwords,  [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorPasswordsDoNotMatch('Passwords do not match')
      return;
    }

    userId && resetToken && dispatch(resetPasswordRequested(userId, resetToken, password))
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
          <CustomInput
            type='password'
            field='password'
            label='Password'
            onChangeHandler={handleChange}
            value={password}
            required
          />
          <CustomInput
            type='confirmPassword'
            field='confirmPassword'
            label='Confirm password'
            onChangeHandler={handleChange}
            value={confirmPassword}
            required
          />
          {(errorOnResetPassword || errorPasswordsDoNotMatch) && <ErrorContainer error={errorOnResetPassword} customTextMessage={errorPasswordsDoNotMatch} />}
          <CustomButton type='submit'>Reset Password</CustomButton>
        </form>
      )}
    </div>
  )
}

export default ResetPassword