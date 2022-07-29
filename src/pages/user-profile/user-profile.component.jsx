import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faLocationDot, faClipboardList, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import { extractChangedValues } from '../../components/utils/utils'
import { selectCurrentUser, selectErrorOnEditUser, selectIsUpsert }  from '../../redux/user/user.selectors'
import { 
  getUserProfileRequested, 
  editUserRequested, 
  toggleIsUpsert, 
  createAddressRequested, 
  editAddressRequested, 
  deleteAddressRequested, 
  deleteAccountRequested
} from '../../redux/user/user.actions'


import UserMainInfo from '../../components/user-main-info/user-main-info.component'
import UserAddressInfo from '../../components/user-address-info/user-address-info.component'
import AccountSettings from '../../components/account-settings/account-settings.component'

import './user-profile.style.scss'

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const isUpsert = useSelector(selectIsUpsert)
  const errorOnEdit = useSelector(selectErrorOnEditUser)

  const [toggleTabState, setToggleTabState] = useState(5)
  const [userInfo, setUserInfo] = useState(currentUser || {})
  const [addressToUpsert, setAddressToUpsert] = useState({})
  const [isEditAddress, setIsEditAddress] = useState(false)
  
  const emptyAddressObj = {
    title: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  }

  const toggleTab = (index) => {
    isUpsert && dispatch(toggleIsUpsert())
    setToggleTabState(index)
  }

  const handleUpsert = () => dispatch(toggleIsUpsert())

  const handleCancel = () => {
    updateUserInfoObject()
    dispatch(toggleIsUpsert())
  }
  
  const openCreateAddress = () => {
    setIsEditAddress(false)
    setAddressToUpsert(emptyAddressObj)
    handleUpsert()
  }

  const openEditAddress = address => {
    setAddressToUpsert(address)
    setIsEditAddress(true)
    handleUpsert()
  }

  const handleSaveAddress = () => {
    let address = addressToUpsert,
        id = addressToUpsert._id
    
    id ? dispatch(editAddressRequested(id, address)) : dispatch(createAddressRequested(address))
  }

  const handleSetAsDefaultAddress = (id, type) => {
    let dataObj = { [type] : id } 

    dispatch(editUserRequested(dataObj))
  }

  const handleDeleteAddress = id => {
    dispatch(deleteAddressRequested(id))
  }
  
  const handleChange = event => {
    const { value, name } = event.target
    setUserInfo({ 
      ...userInfo,  
      [name]: {
        value,
        isChanged: true
      }
    })
  }

  const handleChangeAddress = event => {
    const { value, name } = event.target

    setAddressToUpsert({
      ...addressToUpsert,
      [name]: value
    })
  }
  
  const handleEditUserInfo = property => {
    let dataObj = {}

    dataObj = property instanceof String ? 
      userInfo[property].isChanged ? { [property]: userInfo[property].value } : {} 
      : 
      extractChangedValues(userInfo)

    dispatch(editUserRequested(dataObj))
  }

  // const handleChangeAvatar = event => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setUserInfo({ 
  //       ...setUserInfo, 
  //       [e.target.name]: {
  //         value: URL.createObjectURL(e.target.files[0]),
  //         isChanged: true
  //       }
  //     })
  //   }
  // }

  const handleDeleteAccount = () => {
    // TODO: check for orders with status active and unused gift cards 
    // and then continue with delete account

    debugger
    dispatch(deleteAccountRequested({ navigate }))
  }


  const updateUserInfoObject = () => {
    let collectedData = {}
    currentUser && Object.entries(currentUser).forEach(([key, data]) => {
      collectedData[key] = { value: data, isChanged: false }
    })
    setUserInfo(collectedData)
  }

  useEffect(() => {
    dispatch(getUserProfileRequested())
  }, [])

  useEffect(() => {
    updateUserInfoObject()
  }, [currentUser])

  return (
    <div className='user-profile-page'>
      <h3 className='user-profile-title'>My Account</h3> 
      <div className='container'>
        <div className='menu-tabs'>

          <div 
            className={toggleTabState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <FontAwesomeIcon icon={faUser} /> My Profile
          </div>

          <div 
            className={toggleTabState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <FontAwesomeIcon icon={faLocationDot} /> Address Book
          </div>
          
          <div 
            className={toggleTabState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            <FontAwesomeIcon icon={faClipboardList} /> My Orders
          </div>
          
          <div 
            className={toggleTabState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            <FontAwesomeIcon icon={faCreditCard} /> Payments
          </div>

          <div 
            className={toggleTabState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            <FontAwesomeIcon icon={faGear} /> Account settings
          </div> 
        </div>
        <div className='content-tabs'>

          <div className={toggleTabState === 1 ? "content-user-info  active-content" : "content-user-info"}>
            <UserMainInfo
              fullName={userInfo.fullName?.value}
              email={userInfo.email?.value}
              phone={userInfo.phone?.value}
              birthday={userInfo.birthday?.value}
              handleChange={handleChange}
              handleSaveChanges={handleEditUserInfo}
              handleUpsert={handleUpsert}
              isUpsert={isUpsert}
              errorOnEdit={errorOnEdit}
              handleCancel={handleCancel}
            />
          </div>
          
          <div className={toggleTabState === 2 ? "content-user-info  active-content" : "content-user-info"}>
            <UserAddressInfo
              addresses={userInfo.addresses?.value}
              shippingAddress={userInfo.shippingAddress?.value}
              billingAddress={userInfo.billingAddress?.value}
              isUpsert={isUpsert}
              addressToUpsert={addressToUpsert}
              openCreateAddress={openCreateAddress}
              handleChangeAddress={handleChangeAddress}
              handleSaveChanges={handleSaveAddress}
              isEditAddress={isEditAddress}
              openEditAddress={openEditAddress}
              handleDeleteAddress={handleDeleteAddress}
              handleSetAsDefaultAddress={handleSetAsDefaultAddress}


              errorOnEdit={errorOnEdit}
              handleCancel={handleCancel}
            />
          </div>
          
          <div className={toggleTabState === 3 ? "content-user-info  active-content" : "content-user-info"}>
            Orders
          </div>

          <div className={toggleTabState === 4 ? "content-user-info  active-content" : "content-user-info"}>
            Payments
          </div>
          
          <div className={toggleTabState === 5 ? "content-user-info  active-content" : "content-user-info"}>
            <AccountSettings 
              language={userInfo.language?.value}
              currency={userInfo.currency?.value}
              handleChange={handleChange}
              handleSaveChanges={handleEditUserInfo}
              handleDeleteAccount={handleDeleteAccount}
              handleResetOnCancel={updateUserInfoObject}
            />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile