import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signUpRequested } from '../../../redux/user/user.actions'
import { selectErrorOnSignUp } from '../../../redux/user/user.selectors'

import CustomButton from '../../custom-components/custom-button/custom-button.component'
import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import ErrorContainer from '../../custom-components/error-container/error-container.component'

import './sign-up.style.scss';

const SignUp = () => {
  const dispatch = useDispatch()
  const errorOnSignUp = useSelector(selectErrorOnSignUp)
  const [errorOnNotMatchedPasswords, setErrorOnNotMatchedPasswords] = useState('')
  const [userCredentials, setUserCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { fullName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorOnNotMatchedPasswords('Passwords do not match.')
      return;
    }

    dispatch(signUpRequested(email, password, fullName))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'password' || name === 'confirmPassword') {
      setErrorOnNotMatchedPasswords('')
    }
    setUserCredentials({...userCredentials,  [name]: value });
  }

  return (
    <div className='sign-up'>
      <h2 className='title center'>Sign up</h2>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <CustomInput
          type='text'
          field='fullName'
          label='Name'
          onChangeHandler={handleChange}
          value={fullName}
          required
        />
        <CustomInput
          type='email'
          field='email'
          label='Email'
          onChangeHandler={handleChange}
          value={email}
          required
        />
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
        {(errorOnSignUp || errorOnNotMatchedPasswords) && <ErrorContainer error={errorOnSignUp} customTextMessage={errorOnNotMatchedPasswords} />}
        <div className='sign-up-button'>
          <CustomButton type='submit'>Sign Up</CustomButton>
        </div>
      </form>
      <div className='center padding-top-bottom-20'>
        <span>You already have an account?</span> <Link to='/sign-in' className='underline bold'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp