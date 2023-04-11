import { Link, useLocation } from 'react-router-dom'

import { User } from 'shared/types/users'

import './user-details.style.scss'

type UserDetailsProps = {
  user: User
}

const UserDetails = ({ user }: UserDetailsProps) => {
  const { pathname } = useLocation()
  const { _id: userId, fullName, email, role } = user

  return (
    <tr>
      <th>{fullName}</th>
      <th>{email}</th>
      <th>{role}</th>
      <th>
        <Link to={`${pathname}/edit/${userId}`}>Edit</Link>
      </th>
    </tr>
  )
}

export default UserDetails