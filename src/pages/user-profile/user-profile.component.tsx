import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faLocationDot, faClipboardList, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import { editLoggedUserRequested, getLoggedUserProfileRequested, toggleIsUpsert } from 'redux/user/user.actions'
import { selectCurrentUser, selectErrorOnEditLoggedUser, selectIsUpsert } from 'redux/user/user.selectors'
import { User } from 'shared/types/users'

import './user-profile.style.scss'
import UserMainInfo from 'components/user-profile/user-main-info/user-main-info.component'
import { GenericObject } from 'shared/types/common'
import { displayFormDataEntries, extractChangedValues } from 'shared/helpers'
import UserAddressInfo from 'components/user-profile/user-address-info/user-address-info.component'

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorOnEditLoggedUser = useSelector(selectErrorOnEditLoggedUser)

  const tabsInfo = [
    { label: 'My Profile', icon: faUser},
    { label: 'Address Book', icon: faLocationDot},
    { label: 'My Orders', icon: faClipboardList},
    { label: 'Payments', icon: faCreditCard},
    { label: 'Account settings', icon: faGear},
  ]

  const isUpsert = useSelector(selectIsUpsert)
  const [toggleTabState, setToggleTabState] = useState(1)

  const currentUser: User | null = useSelector(selectCurrentUser)
  const [userInfo, setUserInfo] = useState<User | GenericObject>(currentUser || {})

  const toggleTab = (index: number) => {
    isUpsert && dispatch(toggleIsUpsert())
    setToggleTabState(index)
  }

  const handleUpsert = () => dispatch(toggleIsUpsert())

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    console.log('handleChange', value, name, typeof(value))
    setUserInfo({ 
      ...userInfo,  
      [name]: {
        value,
        isChanged: true
      }
    })
  }

  const handleCancel = () => {
    updateUserInfoObject()
    dispatch(toggleIsUpsert())
  }

  const handleEditUserInfo = () => {
    console.log('handleEditUserInfo', {userInfo})
    let changedValues: GenericObject = {}
    changedValues = extractChangedValues(userInfo)
    
    dispatch(editLoggedUserRequested(changedValues))
    //TODO: investigate this before use
    // let dataObj: GenericObject = {}
    // dataObj = property ? 
    //   userInfo[property].isChanged ? { [property]: userInfo[property].value } : {} 
    //   : 
    //   extractChangedValues(userInfo)

    // dispatch(editLoggedUserRequested(dataObj))
  }

  const updateUserInfoObject = () => {
    const collectedUserData: GenericObject = {}
    currentUser && Object.entries(currentUser).forEach(([key, data]) => {
      key !== '_id' ? collectedUserData[key] = { value: data, isChanged: false } : collectedUserData[key] = { value: data }      
    })
    console.log({collectedUserData})
    setUserInfo(collectedUserData)
  }

  useEffect(() => {
    console.log('test second useEffect')
    updateUserInfoObject()
  }, [currentUser])

  useEffect(() => {
    console.log('in useEffect')
    dispatch(getLoggedUserProfileRequested())
  }, [])

  return (
    <div className='user-profile-page'>
      <h3 className='user-profile-title'>My Account</h3>
      <div className='container'>

        <div className='menu-tabs'> 
          {tabsInfo.map((tabInfo, index) => {
            const { label, icon} = tabInfo
            const tabNumber = index + 1
            return <div 
                className={toggleTabState === tabNumber ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(tabNumber)}
                key={index}
              >
                <FontAwesomeIcon icon={icon} />
                <span>{label}</span>
              </div>
          })}
        </div>

        <div className='content-tabs'>
          <div className={toggleTabState === 1 ? "content-user-info  active-content" : "content-user-info"}>
            <UserMainInfo
              fullName={userInfo.fullName?.value}
              email={userInfo.email?.value}
              phone={userInfo.phone?.value}
              birthday={userInfo.birthday?.value}
              isUpsert={isUpsert}
              handleUpsert={handleUpsert}
              handleChange={handleChange}
              handleCancel={handleCancel}
              handleSaveChanges={handleEditUserInfo}
              errorOnEditLoggedUser={errorOnEditLoggedUser}
            />
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