/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './collections.style.scss'

const Collections = () => {
  const navigate = useNavigate()

  return (
    <div className='collections-container center'>
      Collections here
    </div>
    )
}

export default Collections