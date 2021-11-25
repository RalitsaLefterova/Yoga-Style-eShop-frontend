import React, { useState } from 'react'
import { connect } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

import './sign-in.style.scss'

import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'

// import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import { setCurrentUser } from '../../redux/user/user.actions'
import { login, googleLogin } from '../../rest-api/users'

// const loginUserURL = `${apiConfig.databaseURL}/users/login`

const SignIn = ({ setCurrentUser }) => {
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
    const userResponse = await login(formData)
    const { user, token } = userResponse.data
    console.log({user, token})
    setCurrentUser({user, token})
  }

  const responseSuccessGoogle = async (response) => {
    const userResponse = await googleLogin({ tokenId: response.tokenId })
    const { user, token } = userResponse.data
    console.log({user, token})
    setCurrentUser({user, token})
  }

  const responseFailureGoogle = (response) => {
    console.log('responseFailureGoogle', response)
  }

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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(SignIn)