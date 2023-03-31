import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faLocationDot, faClipboardList, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import { getLoggedUserProfileRequested, toggleIsUpsert } from 'redux/user/user.actions'
import { selectCurrentUser, selectIsUpsert } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'

import './user-profile.style.scss'

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser: User | null = useSelector(selectCurrentUser)
  const isUpsert = useSelector(selectIsUpsert)
  
  const [toggleTabState, setToggleTabState] = useState(1)

  const toggleTab = (index: number) => {
    isUpsert && dispatch(toggleIsUpsert())
    setToggleTabState(index)
  }

  useEffect(() => {
    console.log('in useEffect')
    dispatch(getLoggedUserProfileRequested())
  }, [])

  return (
    <div className='user-profile-page'>
      <h3 className='user-profile-title'>My Account</h3>
      <div className='container'>
        <div className='menu-tabs'>
          <div 
            className={toggleTabState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>My Profile</span>
          </div>

          <div 
            className={toggleTabState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Address Book</span>
          </div>
          
          <div 
            className={toggleTabState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            <span>My Orders</span>
          </div>
          
          <div 
            className={toggleTabState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Payments</span>
          </div>

          <div 
            className={toggleTabState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            <FontAwesomeIcon icon={faGear} /> 
            <span>Account settings</span>
          </div>
        </div>
        <div className='content-tabs'>
          <div className={toggleTabState === 1 ? "content-user-info  active-content" : "content-user-info"}>
            1
          </div>
          <div className={toggleTabState === 2 ? "content-user-info  active-content" : "content-user-info"}>
            2
          </div>
          <div className={toggleTabState === 3 ? "content-user-info  active-content" : "content-user-info"}>
            3
          </div>
          <div className={toggleTabState === 4 ? "content-user-info  active-content" : "content-user-info"}>
            4
          </div>
          <div className={toggleTabState === 5 ? "content-user-info  active-content" : "content-user-info"}>
            5
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage