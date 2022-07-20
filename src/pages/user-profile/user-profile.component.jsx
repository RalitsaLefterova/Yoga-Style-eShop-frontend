import React, { useState, useEffect, useCallback } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCurrentUser, selectErrorOnEditUser }  from '../../redux/user/user.selectors'
import { getUserProfileRequested, editUserRequested } from '../../redux/user/user.actions'


import { editUserInfo, deleteAccount } from '../../rest-api/users'
import { setCurrentUser, deleteAccountSuccess } from '../../redux/user/user.actions'

import UserMainInfo from '../../components/user-main-info/user-main-info.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import FormInput from '../../components/form-input/form-input.component'
import AddressPreview from '../../components/address-preview/address-preview.component'
import UpsertAddress from '../../components/upsert-address/upsert-address.component'
import ConfirmDeleteAccount from '../../components/confirm-delete-account/confirm-delete-account.component'

import './user-profile.style.scss'

const UserProfile = ({ setCurrentUser, deleteAccountSuccess }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const error = useSelector(selectErrorOnEditUser)

  const [toggleState, setToggleState] = useState(1)
  const toggleTab = (index) => setToggleState(index)

  const [isEditMainInfo, setIsEditMainInfo] = useState(false)
  const handleEditMainInfo = () => setIsEditMainInfo(!isEditMainInfo)
  
  const [isHiddenConfirmWindow, setIsHidenConfirmWindow] = useState(true)
  
  const [userInfo, setUserInfo] = useState({
    email: { value: '', isChanged: false },
    fullName: { value: '', isChanged: false },
    phone: { value: '', isChanged: false },
    birthday: { value: '', isChanged: false },
    avatar: { value: '', isChanged: false },
    language: { value: 'EN', isChanged: false },
    currency: { value: '', isChanged: false },
    addresses: { value: [], isChanged: false },
    billingAddress: { value: [], isChanged: false },
    shippingAddress: { value: {}, isChanged: false }
  })
  
  const [isUpsertAddressActive, setIsUpsertAddressActive] = useState(false)
  const [isEditAddress, setIsEditAddress] = useState(false)

  const emptyAddressObj = {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    defaultShippingAddress: false,
    defaultBillingAddress: false
  }
  const [addressToEdit, setAddressToEdit] = useState(emptyAddressObj)

  const { email, fullName, phone, birthday, avatar, language, currency, addresses, billingAddress, shippingAddress } = userInfo

  console.log({userInfo})

  // console.log('isUpsertAddressActive', isUpsertAddressActive)

  

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

  const handleEditUserInfo = event => {
    
    event.preventDefault()
    let dataObj = {}
 
    Object.entries(userInfo).forEach(([key, data]) => {
      data.isChanged && (dataObj[key] = data.value)
    })

    dispatch(editUserRequested(dataObj))
    setIsEditMainInfo(!!error)
  }



  const handleChangeAvatar = event => {
    if (event.target.files && event.target.files.length > 0) {
      setUserInfo({ 
        ...setUserInfo, 
        [e.target.name]: {
          value: URL.createObjectURL(e.target.files[0]),
          isChanged: true
        }
      })
    }
  }

  const handleChangeAddress = event => {
    const { value, name } = event.target
    console.log(value, name)
    setAddressToEdit({
      ...addressToEdit,
      [name]: value
    })
  }

  const handleAddAddress = () => {
    setAddressToEdit(undefined)
    setIsEditAddress(false)
    setIsUpsertAddressActive(true)
  }

  const handleEditAddress = address => {
    setAddressToEdit(address)
    setIsEditAddress(true)
    setIsUpsertAddressActive(true)
  }
  const deleteAddress = id => event => {
    // console.log('deleteAddress', event, id)
  }

  const handleSaveAddress = () => {
    console.log({addressToEdit})
    
    editUserInfo({ address: addressToEdit }).then(response => {
      console.log('saveAddress', {response})
      if (!response) {
        throw new Error()
      }
      debugger
      setIsUpsertAddressActive(false)
      setCurrentUser(response)
    }).catch(error => console.log(error))

  }

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
      console.log('response', response)
      if (response) {
        navigate('/')
        deleteAccountSuccess()
      }
    }).catch(error => {
      console.log('error', error)
    })
  }

  const updateUserInfoObject = () => {
    let collectedData = {}
    currentUser && Object.entries(currentUser).forEach(([key, data]) => {
      key !== "_id" && (collectedData[key] = { value: data, isChanged: false })
    })
    setUserInfo(collectedData)
  }

  useEffect(() => {
    console.log('first effect')
    dispatch(getUserProfileRequested())
  }, [])

  useEffect(() => {
    console.log('second effect')
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
            My details
          </div>

          {/* List of addresses, one of them default */}
          <div 
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            My address book
          </div>
          
          <div 
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            My orders
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
              fullName={fullName?.value || ''}
              email={email?.value || ''}
              birthday={birthday?.value || ''}
              phone={phone?.value || ''}
              handleChangeData={handleChange}
              isEdit={isEditMainInfo}
              handleEdit={handleEditMainInfo}
              handleSaveChanges={handleEditUserInfo}
              error={error}
            />
          </div>
          
          <div
            className={toggleState === 2 ? "content-user-info  active-content" : "content-user-info"}
          >
            {isUpsertAddressActive ? 
              <UpsertAddress 
                isEdit={isEditAddress}
                addressInfo={addressToEdit}
                onSaveAddress={handleSaveAddress}
                onChangeAddress={handleChangeAddress}
              /> : 
              (<div>
                <div>
                  <h2>Default Addresses</h2>
                  <hr />
                  {shippingAddress || billingAddress ? (
                    <div className='addresses-container'>
                      {shippingAddress?.value || {} ? (
                        <AddressPreview 
                          address={shippingAddress.value} 
                          onEditAddress={handleEditAddress} 
                          onDeleteAddress={deleteAddress} 
                          onSaveAddress={handleSaveAddress}
                          onChangeAddress={handleChangeAddress}
                        />) : null}
                      {billingAddress?.value || {} ? (
                      <AddressPreview 
                        address={billingAddress.value} 
                        onEditAddress={handleEditAddress} 
                        onDeleteAddress={deleteAddress} 
                        onSaveAddress={handleSaveAddress}
                        onChangeAddress={handleChangeAddress}
                      />) : null}
                    </div>
                  ) : (
                    <div>You don't have default shipping and billing address</div>
                  )}
                </div>
                <div>
                  <h2>Additional Address Entries</h2>
                  <hr />
                  {!!addresses?.value ? (
                    <div className='addresses-container'>
                      {addresses?.value.map(address => {
                        if (!!address) return (
                          <AddressPreview 
                            address={address} 
                            key={address._id}
                            onEditAddress={handleEditAddress} 
                            onDeleteAddress={deleteAddress} 
                            onSaveAddress={handleSaveAddress}
                            onChangeAddress={handleChangeAddress}
                          />)
                      })}
                    </div>
                  ) : (
                    <div>You don't have additional addresses</div>
                  )}
                </div>
                <CustomButton onClick={handleAddAddress} inverted>Add new address</CustomButton>
              </div>
            )}
          </div>
          
          <div
            className={toggleState === 3 ? "content-user-info  active-content" : "content-user-info"}
          >
            Orders
          </div>
          
          <div
            className={toggleState === 4 ? "content-user-info  active-content" : "content-user-info"}
          >
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
  deleteAccountSuccess: () => dispatch(deleteAccountSuccess()),
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(UserProfile)