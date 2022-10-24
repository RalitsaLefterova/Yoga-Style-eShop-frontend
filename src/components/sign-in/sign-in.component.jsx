import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { emailSignInRequested, googleSignInRequested, resetErrorMessage } from '../../redux/user/user.actions'

import ErrorContainer from '../error-message/error-message.component'
import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'

import './sign-in.style.scss'

const SignIn = ({ error, resetErrorMessage }) => {
  const dispatch = useDispatch()
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const { email, password } = userCredentials

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials,  [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(emailSignInRequested({ email, password }))
  }

  const responseSuccessGoogle = response => 
    dispatch(googleSignInRequested({ tokenId: response.credential }))
  
  useEffect(() => {
    /* global google */ 
    google.accounts.id.initialize({
      client_id: process.env.CLIENT_ID,
      callback: responseSuccessGoogle
    })

    google.accounts.id.renderButton(
      document.getElementById("signInWithGoogle"),
      { theme: "outline", size: "large", width: "200px" }
    )
  }, [])

  useEffect(() =>{
    resetErrorMessage()
  }, [])
  
  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email' 
          type='email'
          defaultValue={email} 
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput 
          name='password' 
          type='password'
          defaultValue={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <div className='right'>
          <Link to='/reset-password'>Forgot password?</Link>
        </div>
        <ErrorContainer errorMessage={error} />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <div id="signInWithGoogle"></div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.user.errorLogIn
})

const mapDispatchToProps = dispatch => ({
  resetErrorMessage: () => dispatch(resetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)