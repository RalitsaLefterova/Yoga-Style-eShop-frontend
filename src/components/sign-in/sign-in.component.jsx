import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './sign-in.style.scss'
import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'

// import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

const createUserURL = "https://yoga-style-backend.herokuapp.com/users"
const loginUserURL = "https://yoga-style-backend.herokuapp.com/users/login"
const getUserProfile = "https://yoga-style-backend.herokuapp.com/users/me"

const formData = {
  // "name": ".ksdhgldskhglkdsg",
  "email": "test6@test6.com",
  "password": "123456qwerty"
}

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const handleSubmit = event => {
    event.preventDefault();
    console.log('in handleSubmit')
  }

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials,  [name]: value });
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.post(loginUserURL, formData).then((response) => {

      console.log('loginUserURL', response.data)
      if (response) {

        const options = {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        }

        axios.get(getUserProfile, options).then(response => {
          console.log('getUserProfile', response)
          setUser(response.data)
        }).catch((e) => {
          console.log({e})
        })
      }
    }).catch((e2) => {
      console.log({e2})
    })
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
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton type='button' isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
      </form>
    </div>
  )
}

export default SignIn