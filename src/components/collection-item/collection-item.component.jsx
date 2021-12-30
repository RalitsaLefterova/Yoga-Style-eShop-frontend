import React from "react"
import { withRouter } from 'react-router-dom'

import './collection-item.style.scss'

const CollectionItem = ({ collection, size, history, match }) => (
  <div className={`${size} collection-item`} onClick={() => history.push(`${match.url}/${collection.title.replace(/\s+/g, '-').toLowerCase()}`)}>
    <div 
      className='background-image'
      style={{backgroundImage: `url(${collection.cover})`}} 
    />
    <div className='content'>
      <h1 className='title'>{collection.title.replace('and', '&').toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
)

export default withRouter(CollectionItem)