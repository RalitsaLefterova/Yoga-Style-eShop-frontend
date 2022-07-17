import React from "react"
import { useNavigate, useLocation } from 'react-router-dom'

import './collection-item.style.scss'

const CollectionItem = ({ collection, size }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, cover } = collection

  return (
    <div 
      className={`${size} collection-item`} 
      onClick={() => navigate(`${pathname}/${title.replace(/\s+/g, '-').toLowerCase()}`)}
    >
      <div 
        className='background-image'
        style={{backgroundImage: `url(${cover})`}} 
      />
      <div className='content'>
        <h1 className='title'>{title.replace('and', '&').toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  )
} 

export default CollectionItem