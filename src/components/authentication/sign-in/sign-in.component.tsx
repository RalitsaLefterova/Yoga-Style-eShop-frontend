import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { emailSignInRequested, googleSignInRequested } from '../../../redux/user/user.actions'
import { selectErrorOnSignIn } from '../../../redux/user/user.selectors'
import { CredentialResponse, GsiButtonConfiguration } from 'shared/interfaces/google-sign-in'

import CustomButton from '../../custom-components/custom-button/custom-button.component'
import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './sign-in.style.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const errorOnSignIn = useSelector(selectErrorOnSignIn)
  // console.log('---1--- errorOnSignIn -> ', errorOnSignIn)
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const { email, password } = userCredentials

  // console.log('userCredentials -> ', userCredentials)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials,  [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(emailSignInRequested(email, password))
  }

  const responseSuccessGoogle = (response: CredentialResponse) => {
    // console.log('responseSuccessGoogle', response)
    const tokenId = response.credential as string
    dispatch(googleSignInRequested(tokenId))
  }
    
  useEffect(() => {
    /* global google */ 
    google.accounts.id.initialize({
      client_id: process.env.CLIENT_ID as string,
      callback: responseSuccessGoogle
    })

    const parrent = document.getElementById("signInWithGoogle") as HTMLElement
    const options: GsiButtonConfiguration = { type: "standard", theme: "outline", size: "large", width: "200px" }
    google.accounts.id.renderButton(
      parrent,
      options
    )
  }, [])

  return (
    <div className='sign-in'>
      <h2 className='title center'>Log in to your account</h2>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type='email'
          field='email'
          label='Email'
          onChangeHandler={handleChange}
          value={email}
          placeholder=" "
          required
        />
        <CustomInput
          type='password'
          field='password'
          label='Password'
          onChangeHandler={handleChange}
          value={password}
          placeholder=" "
          required
        />
        <div className='right'>
          <Link to='/forgot-password' className='underline'>Forgot password?</Link>
        </div>
        {errorOnSignIn && <ErrorContainer error={errorOnSignIn} />}
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