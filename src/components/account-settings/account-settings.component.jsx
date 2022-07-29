import React, { useState } from 'react'

import CustomButton from '../custom-button/custom-button.component'
import CustomSelect from '../custom-select/custom-select.component'
import { toggleModal } from '../custom-alert/custom-alert.component'

import './account-settings.style.scss'

const AccountSettings = ({ 
  language, 
  currency, 
  handleChange,
  handleSaveChanges,
  handleDeleteAccount,
  handleResetOnCancel
}) => {

  const [changeLanguage, setChangeLanguage] = useState(false)
  const [changeCurrency, setChangeCurrency] = useState(false)

  const availableLanguages = ['EN', 'DE', 'BG', 'RU']
  const availableCurrencies = ['EUR', 'USD', 'BGN', 'RUB']

  const warningText = 
  <div className=''>
    <div className='center'>
      <h3><b>This action can’t be undone.</b></h3>
    </div>
    Once deleted, Shop won’t remember the info you might have shared including your:
    <ul>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Order and delivery history</li>
      <li>Shop Pay information including credit and debit card numbers, billing, and shipping addresses</li>
    </ul>
    <div className='center'>
      <h3><b>Are you sure you want to delete your account?</b></h3>
    </div>
  </div>

  const openConfirmationModal = () => {
    toggleModal(true, {
      title: 'Delete Your Account',
      text: warningText,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, I don\'t want to delete my account',
      showConfirmButton: true,
      confirmButtonText: 'Yes, delete my account',
      onConfirmAction: handleDeleteAccount
    })
  }

  const openChangeLanguage = () => {
    setChangeLanguage(true)
  }

  const openChangeCurrency = () => {
    setChangeCurrency(true)
  }

  const handleSave = event => {
    let element = event.target.attributes.id.value 

    switch (element) {
      case 'language':
        setChangeLanguage(false)
      case 'currency':
        setChangeCurrency(false)
    }

    handleSaveChanges(element)
  }

  const closeChangeLanguage = () => {
    handleResetOnCancel()
    setChangeLanguage(false)
  }

  const closeChangeCurrency = () => {
    handleResetOnCancel()
    setChangeCurrency(false)
  }

  return (
    <>
      <div className='language-container'>
        {changeLanguage ? (
          <>
            <CustomSelect 
              type='language'
              data={availableLanguages}
              handler={handleChange}
              label='Language'
              placeholder='Select language'
              selectname='language'
              value={language}
              extraclasses=''
            />
            
            <button onClick={closeChangeLanguage}>Cancel</button>
            <button id='language' onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            Language: {language}
            <button onClick={openChangeLanguage}>Change language</button>
          </>
        )}
        </div>
      <div className='currency-container'>
        {changeCurrency ? (
          <>
            <CustomSelect 
              type='currency'
              data={availableCurrencies}
              handler={handleChange}
              label='Currency'
              placeholder='Select currency'
              selectname='currency'
              value={currency}
              extraclasses=''
            />
            
            <button onClick={closeChangeCurrency}>Cancel</button>
            <button id='currency' onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            Currency: {currency}
            <button onClick={openChangeCurrency}>Change currency</button>
          </>
        )}
        
      </div>
      <div className='delete-account-container'>
        <CustomButton onClick={openConfirmationModal} inverted>
          Delete your account
        </CustomButton>
      </div>
    </>
  )
}

export default AccountSettings