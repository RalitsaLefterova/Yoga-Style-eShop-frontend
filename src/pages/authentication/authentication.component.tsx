import SignIn from '../../components/authentication/sign-in/sign-in.component';
import SignUp from '../../components/authentication/sign-up/sign-up.component';

import './authentication.style.scss';

const AuthenticationPage = () => (
  <div className='authentication'>
    <SignIn />
    <SignUp />
  </div>
)

export default AuthenticationPage; 