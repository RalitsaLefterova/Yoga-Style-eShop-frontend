import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signup } from '../../rest-api/users'
import { setCurrentUser, setToken, resetErrorMessage, signUpFailure } from '../../redux/user/user.actions'
import ErrorContainer from '../error-message/error-message.component'

import './sign-up.style.scss';

const SignUp = ({ error, setCurrentUser, setToken, resetErrorMessage, signUpFailure }) => {
  const [userCredentials, setUserCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { fullName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    signup({ email, password, fullName }).then(response => {
      if (response.isAxiosError) {
        throw new Error(response.response.data)
      }
      if (response.data) {
        const { user, token } = response.data
        setCurrentUser(user)
        setToken(token)
      }
    }).catch(error => {
      console.log({error})
      signUpFailure(error.message)
    });

  }

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({...userCredentials,  [name]: value });
  }

  useEffect(() =>{
    resetErrorMessage()
  }, [])

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='fullName'
          value={fullName}
          onChange={handleChange}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <ErrorContainer errorMessage={error} />
        <CustomButton type='submit'>Sign Up</CustomButton>
      </form>
    </div>
  )

}

const mapStateToProps = state => ({
  error: state.user.errorSignUp
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setToken: token => dispatch(setToken(token)),
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  signUpFailure: error => dispatch(signUpFailure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)