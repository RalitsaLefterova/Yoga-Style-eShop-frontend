import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { adminGetAllUsersRequested } from 'redux/user/user.actions'
import { selectUsersList } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'

import UserDetails from '../user-details/user-details.component'
import Spinner from 'components/spinner/spinner.component'

import './users-list.style.scss'

const UsersList = () => {
  const dispatch = useDispatch()
  const usersList: User[] = useSelector(selectUsersList)

  console.log({usersList})

  useEffect(() => {
    dispatch(adminGetAllUsersRequested())
  }, [])
  
  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Manage users</h1>
      </div>
      <div className='table-container'>
        {usersList && usersList.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(user => (
                <UserDetails key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default UsersList