import { useParams } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetUserByIdRequested } from 'redux/user/user.actions'
import { selectSelectedUser } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'
import { GenericObject } from 'shared/types/common'

import './user-details.style.scss'

const UserDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const selectedUser: User | null | GenericObject = useSelector(selectSelectedUser)
  const { _id: userId, fullName, addresses, billingAddress, shippingAddress, currency, email, language, role } = selectedUser as User

  console.log({selectedUser})
  
  useEffect(() => {
    params.id && dispatch(adminGetUserByIdRequested(params.id))
  }, [])

  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>{fullName}</h1>
        <p>User ID: {userId}</p>
      </div>
      <div className="left">
        <div>
          <strong>Name:</strong> {fullName}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Role:</strong> {role}
          {/* TODO: edit role functionality */}
        </div>
        <div>
          <strong>Currency:</strong> {currency}
        </div>
        <div>
          <strong>Language:</strong> {language}
        </div>
        <div>
          <strong>Billing address:</strong> {billingAddress ? billingAddress : 'Not Set'}
        </div>
        <div>
          <strong>Shipping address:</strong> {shippingAddress ? shippingAddress : 'Not Set'}
        </div>
      </div>
    </div>
  )
}

export default UserDetails