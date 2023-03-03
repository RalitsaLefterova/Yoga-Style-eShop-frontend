import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { emailSignInRequested, googleSignInRequested } from '../../redux/user/user.actions'
import { selectErrorOnSignIn } from '../../redux/user/user.selectors'

import ErrorContainer from '../error-message/error-message.component'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-in.style.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  let errorOnSignIn = useSelector(selectErrorOnSignIn)
  // console.log('---1--- errorOnSignIn -> ', errorOnSignIn)
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
  
  return (
    <div className='sign-in'>
      <h2 className='title center'>Log in to your account</h2>
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
          <Link to='/forgot-password' className='underline'>Forgot password?</Link>
        </div>
        <ErrorContainer errorMessage={errorOnSignIn} />
        <div className='sign-in-button'>
          <CustomButton type='submit'>Sign In</CustomButton>
        </div>
      </form>
      <div className='center padding-top-bottom-20'>
        or sign in with:
      </div>
      <div id="signInWithGoogle"></div>
      <div className='center padding-top-bottom-20'>
        <span>Don't have an account yet?</span> <Link to='/sign-up' className='underline bold'>Sign Up</Link>
      </div>
    </div>
  )
}

export default SignIn