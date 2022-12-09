import React from 'react'
import { Link } from 'react-router-dom'


import './footer.style.scss'

const Footer = () => (
  <div className='footer-container'>
    
    <div className='info-links'>
      <div className='options'>
        <Link className='option' to='/aboutus'>About us</Link>
        <Link className='option' to='/contacts'>Contacts</Link>
        <Link className='option' to='/privacy-policy'>Privacy Policy</Link>
      </div>
      <div className='options'>
        <Link className='option' to='/delivery'>Delivery</Link>
        <Link className='option' to='/gift-cards'>Gift Cards</Link>
        <Link className='option' to='/contacts'>Returns & Replacements</Link>
      </div>
      <div className='options'>
        <div className='footer-title'>NEWSLETTER</div>
        <input className='footer-input' type='text' />
        <button className='footer-btn'>Subscribe</button>
      </div>
    </div>
    
    <p className='owner-box'>Created by: The Crazy Squirrel</p>
  </div>
)

export default Footer