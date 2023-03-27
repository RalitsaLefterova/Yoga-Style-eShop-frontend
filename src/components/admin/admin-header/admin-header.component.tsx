import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCurrentUser } from 'redux/user/user.selectors'

import './admin-header.style.scss'

const AdminHeader = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <div className='admin-header-container'>
      <div className='website-link-box'>
        <Link to={`${process.env.FRONTEND_URL}`} target='_self' >Go to website</Link>
      </div>
      <div className="logged-user-box">
        Wellcome {currentUser.fullName}
      </div>
    </div>
  )
}

export default AdminHeader