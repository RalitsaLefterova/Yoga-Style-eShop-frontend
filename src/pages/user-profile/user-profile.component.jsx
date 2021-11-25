import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './user-profile.style.scss'

import { getUserProfile } from '../../rest-api/users'

const UserProfile = ({ token }) => {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    if (token) {
      getUserProfile(token).then(response => {
        console.log('getUserProfile', response)
        setName(response.name)
        setEmail(response.email)
      })
    }
  }, [])

  return (
    <div className='user-profile'> 
      User Profile Page 
      <div>
        Name: {name}
      </div>
      <div>
        Email: {email}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  token: state.user.token
})

export default connect(mapStateToProps)(UserProfile)