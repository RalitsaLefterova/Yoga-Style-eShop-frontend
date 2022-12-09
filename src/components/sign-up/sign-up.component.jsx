import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { signUpRequested } from '../../redux/user/user.actions'
import { selectErrorOnSignUp } from '../../redux/user/user.selectors'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import ErrorContainer from '../error-message/error-message.component'

import './sign-up.style.scss';

const SignUp = () => {
  const dispatch = useDispatch()
  const errorOnSignUp = useSelector(selectErrorOnSignUp)
  const [userCredentials, setUserCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { fullName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      errorOnSignUp = 'Passwords do not match';
      return;
    }

    dispatch(signUpRequested({ email, password, fullName }))
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({...userCredentials,  [name]: value });
  }

  return (
    <div className='sign-up'>
      <h2 className='title center'>Sign up</h2>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='fullName'
          defaultValue={fullName}
          onChange={handleChange}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          defaultValue={email}
          onChange={handleChange}
          label='Email'
          required
        />
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
        <ErrorContainer errorMessage={errorOnSignUp} />
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