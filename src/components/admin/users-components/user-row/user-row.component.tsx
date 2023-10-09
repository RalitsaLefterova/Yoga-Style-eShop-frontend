import { useLocation, useNavigate } from 'react-router-dom'

import { User } from 'shared/types/users'
import { humanizeDate } from 'shared/helpers'

import './user-row.style.scss'

type UserRowProps = {
  user: User
}

const UserRow = ({ user }: UserRowProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { _id: userId, fullName, email, role, createdAt } = user

  const handleOpenUserDetails = () => {
    navigate(`${pathname}/${userId}`)
  }

  return (
    <tr className='user-row' onClick={handleOpenUserDetails}>
      <th>{fullName}</th>
      <th>{email}</th>
      <th>{humanizeDate(createdAt)}</th>
      <th>{role}</th>
    </tr>
  )
}

export default UserRow 