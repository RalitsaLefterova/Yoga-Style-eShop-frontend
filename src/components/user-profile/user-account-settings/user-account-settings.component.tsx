import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react'

import CustomButton from '../../custom-components/custom-button/custom-button.component'
import CustomSelect from '../../custom-components/custom-select/custom-select.component'
import { toggleModal } from '../../custom-components/custom-alert/custom-alert.component'

import './user-account-settings.style.scss'

type UserAccountSettingsProps = {
  language: string,
  currency: string,
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  handleSaveChanges: () => void,
  handleDeleteAccount: () => void,
  handleResetOnCancel: () => void
}

const UserAccountSettings = ({ 
  language, 
  currency, 
  handleChange,
  handleSaveChanges,
  handleDeleteAccount,
  handleResetOnCancel
}: UserAccountSettingsProps) => {

  const [changeLanguage, setChangeLanguage] = useState(false)
  const [changeCurrency, setChangeCurrency] = useState(false) 

  const availableLanguages = ['EN', 'DE', 'BG', 'RU']
  const availableCurrencies = ['EUR', 'USD', 'BGN', 'RUB']

  const warningText = 
  <div className=''>
    <div className='center bold'>
      <h3>This action can’t be undone.</h3>
    </div>
    We're sorry to see you go. Once your account is deleted, all of your information will be permanently gone, including your:
    <ul className='warning-message-list'>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Orders and delivery history</li>
      <li>Payment information including credit and debit card numbers, billing, and shipping addresses</li>
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

  const closeChangeLanguage = () => {
    handleResetOnCancel()
    setChangeLanguage(false)
  }

  const closeChangeCurrency = () => {
    handleResetOnCancel()
    setChangeCurrency(false)
  }

  const handleSave = (event: React.MouseEvent) => {
    const target = event.target as Element
    const element: string = target.id

    switch (element) {
      case 'language':
        setChangeLanguage(false)
        break;
      case 'currency':
        setChangeCurrency(false)
        break;
    }

    handleSaveChanges()
  }

  return (
    <>
      <div className='settings-container'>
        {changeLanguage ? (
          <div className=''>
            <CustomSelect 
              typeOfData='language'
              data={availableLanguages}
              handler={handleChange}
              labelText='Language'
              placeholder='Select language'
              selectname='language'
              value={language}
              // extraclasses=''
            />
            
            <CustomButton onClick={closeChangeLanguage} additionalClasses='settings-cancel-btn'>Cancel</CustomButton>
            <CustomButton id='language' onClick={handleSave} additionalClasses='settings-save-btn'>Save</CustomButton>
          </div>
        ) : (
          <>
            <span>Language: {language}</span>
            
            <CustomButton onClick={openChangeLanguage} additionalClasses='settings-btn'>Change language</CustomButton>
          </>
        )}
      </div>
      <div className='settings-container'>
        {changeCurrency ? (
          <>
            <CustomSelect 
              typeOfData='currency'
              data={availableCurrencies}
              handler={handleChange}
              labelText='Currency'
              placeholder='Select currency'
              selectname='currency'
              value={currency}
              // extraclasses=''
            />
            
            <CustomButton onClick={closeChangeCurrency} additionalClasses='settings-cancel-btn'>Cancel</CustomButton>
            <CustomButton id='currency' onClick={handleSave} additionalClasses='settings-save-btn'>Save</CustomButton>
          </>
        ) : (
          <>
            <span>Currency: {currency}</span>
            <CustomButton onClick={openChangeCurrency} additionalClasses='settings-btn'>Change currency</CustomButton>
          </>
        )}
        
      </div>

      <div className='settings-container'>
        <CustomButton onClick={openConfirmationModal} additionalClasses='delete-account-btn'>
          Delete your account?
        </CustomButton>
      </div>

      <div className='settings-container'>
        Other settings here...
      </div>
    </>
  )
}

export default UserAccountSettings