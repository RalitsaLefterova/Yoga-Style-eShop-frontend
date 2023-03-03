import React from "react"
import { useNavigate, useLocation } from 'react-router-dom'

import { Collection } from '../../shared/types/collections'

import './collection-item.style.scss'

type CollectionItemType = {
  collection: Collection,
  size: string
}
 
const CollectionItem = ({ collection, size }: CollectionItemType) => {
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
        style={{backgroundImage: `url(${process.env.BACKEND_URL}/uploads/collections/${cover})`}} 
      />
      <div className='content'>
        <h1 className='title'>{title.replace('and', '&').toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  )
} 

export default CollectionItem