import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { adminGetAllUsersRequested } from 'redux/user/user.actions'
import { selectIsLoading, selectUsersList } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'

import UserRow from '../user-row/user-row.component'
import Spinner from 'components/spinner/spinner.component'

import './users-list.style.scss'

const UsersList = () => {
  const dispatch = useDispatch()
  const usersList: User[] = useSelector(selectUsersList)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(adminGetAllUsersRequested())
  }, [])
  
  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Users Management</h1>
      </div>
      <div className='table-container'>
        {isLoading ? (
          <Spinner />
        ) : (
          usersList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Member since</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(user => (
                  <UserRow key={user._id} user={user} />
                ))}
              </tbody>
            </table>
          ) : (
            <div className='full-width center'>No users found.</div>
          )
        )}
      </div>
    </div>
  )
}

export default UsersList