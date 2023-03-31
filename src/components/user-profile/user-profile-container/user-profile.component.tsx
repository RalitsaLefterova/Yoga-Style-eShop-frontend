import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faLocationDot, faClipboardList, faCreditCard } from '@fortawesome/free-solid-svg-icons'

import { extractChangedValues } from '../../../shared/helpers'
import { selectCurrentUser, selectErrorOnEditUser, selectIsUpsert }  from '../../../redux/user/user.selectors'
import { 
  getLoggedUserProfileRequested, 
  editLoggedUserRequested, 
  toggleIsUpsert, 
  createAddressRequested, 
  editAddressRequested, 
  deleteAddressRequested, 
  deleteAccountRequested
} from '../../../redux/user/user.actions'
import { Address } from 'shared/types/addresses'
import { GenericObject } from 'shared/types/common'

import UserMainInfo from '../user-main-info/user-main-info.component'
import UserAddressInfo from '../user-address-info/user-address-info.component'
import UserOrders from '../user-orders/user-orders.component'
import UserAccountSettings from '../user-account-settings/user-account-settings.component'

import './user-profile.style.scss'
import { User } from 'shared/types/users'

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const isUpsert = useSelector(selectIsUpsert)
  const errorOnEdit = useSelector(selectErrorOnEditUser)

  const [toggleTabState, setToggleTabState] = useState(3)
  const [userInfo, setUserInfo] = useState<User | GenericObject>(currentUser || {})
  const [addressToUpsert, setAddressToUpsert] = useState<Address>()
  const [isEditAddress, setIsEditAddress] = useState(false)
  
  const emptyAddressObj: Address | GenericObject = {
    title: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  }

  const toggleTab = (index: number) => {
    isUpsert && dispatch(toggleIsUpsert())
    setToggleTabState(index)
  }

  const handleUpsert = () => dispatch(toggleIsUpsert())

  const handleCancel = () => {
    updateUserInfoObject()
    dispatch(toggleIsUpsert())
  }
  
  const openCreateAddress = () => {
    // setIsEditAddress(false)
    // setAddressToUpsert(emptyAddressObj)
    // handleUpsert()
  }

  const openEditAddress = (address: Address) => {
    setAddressToUpsert(address)
    setIsEditAddress(true)
    handleUpsert()
  }

  const handleSaveAddress = () => {
    const address = addressToUpsert
    if (address) {
      const addressId = address._id
      addressId ? dispatch(editAddressRequested(addressId, address)) : dispatch(createAddressRequested(address))
    }
  }

  const handleSetAsDefaultAddress = (addressId: string, type: string) => {
    const addressObj = { [type] : addressId } 
    console.log({addressObj})
    //TODO: investigate this before use
    // dispatch(editLoggedUserRequested(addressObj))
  }

  const handleDeleteAddress = (id: string) => {
    dispatch(deleteAddressRequested(id))
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setUserInfo({ 
      ...userInfo,  
      [name]: {
        value,
        isChanged: true
      }
    })
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    //TODO: investigate this before use
    // setAddressToUpsert({
    //   ...addressToUpsert,
    //   [name]: value
    // })
  }
  
  const handleEditUserInfo = (property: string) => {
    console.log({property})
    //TODO: investigate this before use
    // let dataObj: GenericObject = {}
    // dataObj = property ? 
    //   userInfo[property].isChanged ? { [property]: userInfo[property].value } : {} 
    //   : 
    //   extractChangedValues(userInfo)

    // dispatch(editLoggedUserRequested(dataObj))
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
    dispatch(deleteAccountRequested(navigate))
  }


  const updateUserInfoObject = () => {
    const collectedData: GenericObject = {}
    currentUser && Object.entries(currentUser).forEach(([key, data]) => {
      collectedData[key] = { value: data, isChanged: false }
    })
    console.log({collectedData})
    setUserInfo(collectedData)
  }

  useEffect(() => {
    dispatch(getLoggedUserProfileRequested())
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
              // handleSaveChanges={handleEditUserInfo}
              // handleUpsert={handleUpsert}
              isUpsert={isUpsert}
              // errorOnEdit={errorOnEdit}
              // handleCancel={handleCancel}
            />
          </div>
          
          <div className={toggleTabState === 2 ? "content-user-info  active-content" : "content-user-info"}>
            {/* <UserAddressInfo
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

              // errorOnEdit={errorOnEdit}
              // handleCancel={handleCancel}
            /> */}
          </div>
          
          <div className={toggleTabState === 3 ? "content-user-info  active-content" : "content-user-info"}>
            <UserOrders />
          </div>

          <div className={toggleTabState === 4 ? "content-user-info  active-content" : "content-user-info"}>
            Payments
          </div>
          
          <div className={toggleTabState === 5 ? "content-user-info  active-content" : "content-user-info"}>
            <UserAccountSettings 
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