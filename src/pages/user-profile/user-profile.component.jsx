import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './user-profile.style.scss'

import CustomButton from '../../components/custom-button/custom-button.component'
import FormInput from '../../components/form-input/form-input.component'
import ConfirmDeleteAccount from '../../components/confirm-delete-account/confirm-delete-account.component'
import { deleteAccount } from '../../rest-api/users'
import { deleteAccountSuccess } from '../../redux/user/user.actions'

const UserProfile = ({ currentUser, deleteAccountSuccess, match, history }) => {
  const [toggleState, setToggleState] = useState(1)
  const [isHiddenConfirmWindow, setIsHidenConfirmWindow] = useState(true)
  const [name, setName] = useState(currentUser ? currentUser.name : '')
  const [email, setEmail] = useState(currentUser ? currentUser.email : '')

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const handleChange = event => {
    const { name, value } = event.target;
    if (name == 'name') {
      setName(value)
    }
    if (name == 'email') {
      setEmail(value)
    }
    
  }

  const handleDeleteAccount = () => {
    // TODO check for orders with status active and gift unused gift cards and then continue with delete account

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
    console.log('in deleteUserAccount')
    // deleteAccount().then(response => {
    //   console.log('response', response)
    //   if (response) {
    //     history.push('/')
    //     deleteAccountSuccess()
    //   }
    // }).catch(error => {
    //   console.log('error', error)
    // })
  }

  

  useEffect(() => {
  
  }, [])

  return (
    <div className='user-profile-page'> 
      <h3 className='user-profile-title'>My Account</h3> 
      <div className='container'>
        <div className='menu-tabs'>

          {/* Name, age, phone number, email */}
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
              name='name'
              value={name}
              onChange={handleChange}
              label='Name'
              required
            />
            <FormInput
              name='email' 
              type='email'
              value={email} 
              handleChange={handleChange}
              label='Email'
              required
            />
            <div className='group'>
              <label className='form-input-label shrink'>
                Birthday:
              </label>
              <input className='form-input' onChange={handleChange} value=''  />
            </div>
            
             
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
  deleteAccountSuccess: () => dispatch(deleteAccountSuccess())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile))