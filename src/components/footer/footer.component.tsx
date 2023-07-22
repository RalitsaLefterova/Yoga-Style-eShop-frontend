import React, { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'

import './footer.style.scss'

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState('')

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const emailValue: string = event.target.value
    setSubscribeEmail(emailValue)
  }

  const handleSubscribeUser = () => {
    //TODO: Handle subscribe/unsubscribe user in backend first!!!
  }

  return (
    <div className='footer-container'>
      
      <div className='info-links'>
        <div className='options'>
          <Link className='option' to='/about-us'>About us</Link>
          <Link className='option' to='/contacts'>Contacts</Link>
          <Link className='option' to='/privacy-policy'>Privacy Policy</Link>
        </div>
        <div className='options'>
          <Link className='option' to='/delivery'>Delivery</Link>
          <Link className='option' to='/gift-cards'>Gift Cards</Link>
          <Link className='option' to='/contacts'>Returns & Replacements</Link>
        </div>
        <div className='options newsletter-container'>
          <YogaStyleInput 
            inputType='email'
            fieldName='subscribeEmail'
            labelText='NEWSLETTER'
            inputValue={subscribeEmail}
            onChangeHandler={handleChangeEmail}
            extraClasses='subscribe-input'
          />
          <YogaStyleButton
            extraClasses='subscribe-button'
            onClick={handleSubscribeUser}
          >
            Subscribe
          </YogaStyleButton>
        </div>
      </div>
      
      <p className='owner-box'>Created by: The Crazy Squirrel</p>
    </div>
  )
}

export default Footer