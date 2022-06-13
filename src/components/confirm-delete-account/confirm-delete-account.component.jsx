import React from 'react'

import './confirm-delete-account.style.scss'

const ConfirmDeleteAccount = ({ onCancelDelteAccount, onConfirmDeleteAccount }) => {
  return (
    <div className='overlay'>
      <div className='popup'>
        <div className='message'>
              <br />
              <b>This action can’t be undone.</b>
              <br />
              Once deleted, Shop won’t remember the info you might have shared including your:
              <br />
              Email address<br />
              Phone number<br />
              Order and delivery history<br />
              Shop Pay information including credit and debit card numbers, billing, and shipping addresses<br />
              <b>Are you sure you want to delete your account?</b>
        </div>
        <div className='confirmation-buttons'>
          <button onClick={onCancelDelteAccount}>No, I don't want to delete my account</button>
          <button onClick={onConfirmDeleteAccount}>Yes, delete my account</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteAccount