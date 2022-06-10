import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './authentication.style.scss';

const AuthenticationPage = () => (
  <div className='authentication'>
    <SignIn />
    <SignUp />
  </div>
)

export default AuthenticationPage; 