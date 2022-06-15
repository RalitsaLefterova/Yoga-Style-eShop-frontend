import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'
import { resetErrorMessage, setCurrentUser, setToken, signInFailure } from '../../redux/user/user.actions'
import { login, googleLogin } from '../../rest-api/users'
import ErrorContainer from '../error-message/error-message.component'

import './sign-in.style.scss'

const SignIn = ({ error, setCurrentUser, setToken, signInFailure, resetErrorMessage }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials,  [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = {
      "email": email,
      "password": password
    }
    
    login(formData).then(response => {
      if (response.isAxiosError) {
        throw new Error(response.response.data)
      }
      if (response.data) {
        const { user, token } = response.data
        setCurrentUser(user)
        setToken(token)
      }
    }).catch(error => {
      signInFailure(error.message)
    })
  }

  const responseSuccessGoogle = async (response) => {
    googleLogin({ tokenId: response.tokenId }).then(response => {
      console.log('responseSuccessGoogle', {response})
      if (response.isAxiosError) {
        console.log('isAxiosError == true', {response}, response.message)
        throw new Error(response.message)
      }
      if (response.data) {
        const { user, token } = response.data
        setCurrentUser(user)
        setToken(token)
      }
    }).catch(error => {
      console.log('responseSuccessGoogle catch error', {error})
      signInFailure(error.message)
    })
  }

  const responseFailureGoogle = (response) => {
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
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setToken: token => dispatch(setToken(token)),
  signInFailure: error => dispatch(signInFailure(error)),
  resetErrorMessage: () => dispatch(resetErrorMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)