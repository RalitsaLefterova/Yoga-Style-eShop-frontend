import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import MenuItem from '../menu-item/menu-item.component.jsx';

// const createUserURL = "https://yoga-style-backend.herokuapp.com/users"
// const loginUserURL = "https://yoga-style-backend.herokuapp.com/users/login"
// const getUserProfile = "https://yoga-style-backend.herokuapp.com/users/me"

// const formData = {
//   "name": ".ksdhgldskhglkdsg",
//   "email": "test6@test6.com",
//   "password": "123456qwerty"
// }

const CollectionsList = () => {
  // const [user, setUser] = useState(null)

  // useEffect(() => {
  //   axios.post(loginUserURL, formData).then((response) => {

  //     console.log('loginUserURL', response.data)
  //     if (response) {

  //       const options = {
  //         headers: {
  //           Authorization: `Bearer ${response.data.token}`
  //         }
  //       }

  //       axios.get(getUserProfile, options).then(response => {
  //         console.log('getUserProfile', response)
  //         setUser(response.data)
  //       }).catch((e) => {
  //         console.log({e})
  //       })
  //     }
  //   }).catch((e2) => {
  //     console.log({e2})
  //   })
  // }, [])

  return (
    <div className="collections-list">
      COLLECTIONS LIST
    </div>
  )}

export default CollectionsList