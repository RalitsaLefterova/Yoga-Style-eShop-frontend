import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './user-profile.style.scss'

import CustomButton from '../../components/custom-button/custom-button.component'
import FormInput from '../../components/form-input/form-input.component'
import { convertDate, inputDate } from '../../components/utils/utils'
import ConfirmDeleteAccount from '../../components/confirm-delete-account/confirm-delete-account.component'
import { editUserInfo, deleteAccount } from '../../rest-api/users'
import { setCurrentUser, deleteAccountSuccess } from '../../redux/user/user.actions'

const UserProfile = ({ currentUser, setCurrentUser, deleteAccountSuccess, history }) => {
  const [toggleState, setToggleState] = useState(1)
  const [isHiddenConfirmWindow, setIsHidenConfirmWindow] = useState(true)
  const [userInfo, setUserInfo] = useState({
    email: {
      value: currentUser.email || '',
      isChanged: false
    },
    fullName: {
      value: currentUser.fullName || '',
      isChanged: false
    },
    phone: {
      value: currentUser.phone || '',
      isChanged: false
    },
    birthday: {
      value: currentUser.birthday || '',
      isChanged: false
    },
    avatar: {
      value: currentUser.avatar || '',
      isChanged: false
    },
    language: {
      value: currentUser.language || 'EN',
      isChanged: false
    },
    currency: {
      value: currentUser.currency || '',
      isChanged: false
    }
  })

  console.log({userInfo})

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const handleChange = event => {
    const { value, name } = event.target;
    setUserInfo({ 
      ...userInfo,  
      [name]: {
        value: value,
        isChanged: true
      } 
    })
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

  const handleEditUserInfo = event => {
    event.preventDefault()
    let data = {}

    Object.entries(userInfo).forEach(([key, value]) => {
      if (value.isChanged) {
        data[key] = value.value
      }
    })

    editUserInfo(data).then(response => {
      console.log('editUserInfo response: ', response)
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
        history.push('/')
        deleteAccountSuccess()
      }
    }).catch(error => {
      console.log('error', error)
    })
  }

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
          <div
            className={toggleState === 1 ? "content-user-info  active-content" : "content-user-info"}
          >
            <FormInput
              type='text'
              name='fullName'
              value={userInfo.fullName.value || ''}
              onChange={handleChange}
              label='Name'
              required
            />
            <FormInput
              name='email' 
              type='email'
              value={userInfo.email.value || ''} 
              handleChange={handleChange}
              label='Email'
              required
            />
            <FormInput
              name='phone' 
              type='phone'
              value={userInfo.phone.value || ''} 
              handleChange={handleChange}
              label='Phone'
            />
            <div className='group'>
              <label className='form-input-label shrink'>
                Date of birth:
              </label>
              <input 
                type='date' 
                name='birthday' 
                className='form-input' 
                onChange={handleChange} 
                value={convertDate(userInfo.birthday.value)}
                max={inputDate('max')}
                min={inputDate('min')}
              />
            </div>
            <CustomButton onClick={handleEditUserInfo} inverted>Save changes</CustomButton>
          </div>
          
          <div
            className={toggleState === 2 ? "content-user-info  active-content" : "content-user-info"}
          >
            Addresses
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

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  deleteAccountSuccess: () => dispatch(deleteAccountSuccess()),
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile))