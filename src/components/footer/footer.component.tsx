import { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {
  faSquareFacebook,
  faInstagramSquare,
  faYoutubeSquare,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'

import './footer.style.scss'


const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState('')

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setSubscribeEmail(event.target.value)
  }

  const handleSubscribeUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: Handle subscribe/unsubscribe user in the backend first!!!
  }

  return (
    <footer>
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

          <form className='subscribe-form' onSubmit={handleSubscribeUser}>
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
              type='submit'
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </YogaStyleButton>
          </form>

          <div className='social-media-container'>
            FOLLOW US
            <div className='social-media-icons'>
              <Link to="https://www.facebook.com/" target="_blank">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </Link>
              <Link to="https://www.instagram.com/" target="_blank">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </Link>
              <Link to="https://twitter.com/" target="_blank">
                <FontAwesomeIcon icon={faSquareXTwitter} />
              </Link>
              <Link to="https://www.youtube.com/" target="_blank">
                <FontAwesomeIcon icon={faYoutubeSquare} />
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      <p className='owner-box'>&copy; 2024 Yoga Style | Created by: Ralitsa Lefterova</p>
    </footer>
  )
}

export default Footer