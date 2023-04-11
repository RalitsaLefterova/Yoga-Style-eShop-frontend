import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { adminGetUserByIdRequested } from "redux/user/user.actions"
import { selectSelectedUser } from "redux/user/user.selectors"
import { GenericObject } from "shared/types/common"
import { User } from "shared/types/users"

import './edit-user.style.scss'

const EditUser = () => {
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
        <h1>Edit User /ID: {userId}/</h1>
      </div>
      <div className="left">
        <div>Name: {fullName}</div>
        <div>Email: {email}</div>
        <div>Role: {role}</div>
        <div>Currency: {currency}</div>
        <div>Language: {language}</div>
        <div>Billing address: {billingAddress ? billingAddress : 'not set'}</div>
        <div>Shipping address: {shippingAddress ? shippingAddress : 'not set'}</div>
      </div>
    </div>
  )
}

export default EditUser