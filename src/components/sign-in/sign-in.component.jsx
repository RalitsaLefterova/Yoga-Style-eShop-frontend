import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

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
    dispatch(googleSignInRequested({ tokenId: response.tokenId }))

  const responseFailureGoogle = (response) => {
    //TODO: Handle this situation!!!
    console.log('responseFailureGoogle', response)
  }
  
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
          value={email} 
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput 
          name='password' 
          type='password'
          value={password}
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
          {/* <CustomButton type='button' isGoogleSignIn>Sign in with Google</CustomButton> */}
          <GoogleLogin
            // clientId={process.env.CLIENT_ID}
            clientId="114811569485-7tvas3lopl7uvj3l91be1njpbpgmrgss.apps.googleusercontent.com"
            render={renderProps => (
              <CustomButton 
                type='button' 
                isGoogleSignIn 
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                Sign in with Google
              </CustomButton>
            )}
            buttonText="Sign in with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
          />
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