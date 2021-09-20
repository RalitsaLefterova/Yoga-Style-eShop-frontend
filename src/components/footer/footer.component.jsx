import React from 'react'
import { Link } from 'react-router-dom'


import './footer.style.scss'

const Footer = () => (
  <div className='footer'>
    Footer Component
    <div className='options'>
      <Link className='option' to='/contacts'>Contacts</Link>
      <Link className='option' to='/delivery'>Delivery</Link>
      <Link className='option' to='/gift-cards'>Gift Cards</Link>
    </div>
  </div>
)

export default Footer