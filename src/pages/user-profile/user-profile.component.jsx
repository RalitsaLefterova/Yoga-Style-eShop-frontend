import React, { useState, useEffect, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { extractChangedValues } from '../../components/utils/utils'
import { selectCurrentUser, selectErrorOnEditUser, selectIsUpsert }  from '../../redux/user/user.selectors'
import { 
  getUserProfileRequested, 
  editUserRequested, 
  toggleIsUpsert, 
  createAddressRequested, 
  editAddressRequested, 
  deleteAddressRequested 
} from '../../redux/user/user.actions'


import { deleteAccount } from '../../rest-api/users'
import { deleteAccountSuccess } from '../../redux/user/user.actions'

import UserMainInfo from '../../components/user-main-info/user-main-info.component'
import UserAddressInfo from '../../components/user-address-info/user-address-info.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import ConfirmDeleteAccount from '../../components/confirm-delete-account/confirm-delete-account.component'

import './user-profile.style.scss'

const UserProfile = ({ deleteAccountSuccess }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const isUpsert = useSelector(selectIsUpsert)
  const errorOnEdit = useSelector(selectErrorOnEditUser)

  const [toggleState, setToggleState] = useState(2)
  const [userInfo, setUserInfo] = useState(currentUser || {})
  const [addressToUpsert, setAddressToUpsert] = useState({})
  const [isEditAddress, setIsEditAddress] = useState(false)
  const [isHiddenConfirmWindow, setIsHidenConfirmWindow] = useState(true)
  
  const emptyAddressObj = {
    street: '',
    city: '',
    postalCode: '',
    country: ''
  }

  const toggleTab = (index) => {
    isUpsert && dispatch(toggleIsUpsert())
    setToggleState(index)
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
  
  const handleEditUserInfo = event => {
    event.preventDefault()
    let dataObj = extractChangedValues(userInfo)
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
    // TODO check for orders with status active and gift unused gift cards 
    //      and then continue with delete account
    setIsHidenConfirmWindow(false)
  }

  const cancelDelete = () => {
    setIsHidenConfirmWindow(true)
  }

  const confirmDelete = () => {
    setIsHidenConfirmWindow(true)
    deleteUserAccount()
  }

  const deleteUserAccount = () => {
    deleteAccount().then(response => {
      if (response) {
        navigate('/')
        deleteAccountSuccess()
      }
    }).catch(error => error)
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
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            My Account
          </div>

          {/* List of addresses, one of them default */}
          <div 
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Address Book
          </div>
          
          <div 
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            My Orders
          </div>
          
          <div 
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            Account settings
          </div> 
        </div>
        <div className='content-tabs'>

          <div className={toggleState === 1 ? "content-user-info  active-content" : "content-user-info"}>
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
          
          <div className={toggleState === 2 ? "content-user-info  active-content" : "content-user-info"}>
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
          
          <div className={toggleState === 3 ? "content-user-info  active-content" : "content-user-info"}>
            Orders
          </div>
          
          <div className={toggleState === 4 ? "content-user-info  active-content" : "content-user-info"}>
            Language, currency, ...
            <br /><br /><br />
            <CustomButton onClick={handleDeleteAccount} inverted>Delete your account</CustomButton>
          </div>
          
        </div>
      </div>

      {isHiddenConfirmWindow ? 
        null : 
        <ConfirmDeleteAccount 
          onCancelDelteAccount={cancelDelete}
          onConfirmDeleteAccount={confirmDelete} 
        />
      }
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  deleteAccountSuccess: () => dispatch(deleteAccountSuccess())
})

export default connect(null, mapDispatchToProps)(UserProfile)