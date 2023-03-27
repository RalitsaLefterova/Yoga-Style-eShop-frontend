import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './users-list.style.scss'

const UsersList = () => {
  const dispatch = useDispatch()
  
  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Manage users</h1>
      </div>
      <div>
        users list here...
      </div>
    </div>
  )
}

export default UsersList