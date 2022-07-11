import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

import { signUpRequested } from '../../redux/user/user.actions'
import { selectErrorOnSIgnUp } from '../../redux/user/user.selectors'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import ErrorContainer from '../error-message/error-message.component'


import { resetErrorMessage } from '../../redux/user/user.actions'


import './sign-up.style.scss';

const SignUp = ({ resetErrorMessage }) => {
  const dispatch = useDispatch()
  const error = useSelector(selectErrorOnSIgnUp)
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
      alert('password do not match');
      return;
    }

    dispatch(signUpRequested({ email, password, fullName }))
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
  // error: state.user.errorSignUp
})

const mapDispatchToProps = dispatch => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user)),
  // setToken: token => dispatch(setToken(token)),
  resetErrorMessage: () => dispatch(resetErrorMessage()),
  // signUpFailure: error => dispatch(signUpFailure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)