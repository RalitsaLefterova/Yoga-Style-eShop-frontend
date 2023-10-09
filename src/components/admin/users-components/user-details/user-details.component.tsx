import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { adminGetUserByIdRequested } from 'redux/user/user.actions'
import { selectIsLoading, selectSelectedUser } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'

import Spinner from 'components/spinner/spinner.component'

import './user-details.style.scss'

const UserDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const isLoading = useSelector(selectIsLoading)
  const selectedUser: User | null = useSelector(selectSelectedUser)
  
  useEffect(() => {
    params.id && dispatch(adminGetUserByIdRequested(params.id))
  }, [])

  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>
          {isLoading ? 
            'User details loading...' 
          : 
            selectedUser?.fullName ? selectedUser?.fullName : 'User details'
          }
        </h1>
        {selectedUser?._id && <p>User ID: {selectedUser?._id}</p>}
      </div>
      <div className="left">
        {isLoading ? (
          <Spinner />
        ) : (
          selectedUser ? (
            <div className="left">
              <div>
                <strong>Name:</strong> {selectedUser.fullName}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Role:</strong> {selectedUser.role}
                {/* TODO: edit role functionality */}
              </div>
              <div>
                <strong>Currency:</strong> {selectedUser.currency}
              </div>
              <div>
                <strong>Language:</strong> {selectedUser.language}
              </div>
              <div>
                <strong>Billing address:</strong> {selectedUser.billingAddress ? selectedUser.billingAddress : 'Not Set'}
              </div>
              <div>
                <strong>Shipping address:</strong> {selectedUser.shippingAddress ? selectedUser.shippingAddress : 'Not Set'}
              </div>
            </div>
          ) : (
            <div>User details not available.</div>
          )
        )}
      </div>
    </div>
  )
}

export default UserDetails