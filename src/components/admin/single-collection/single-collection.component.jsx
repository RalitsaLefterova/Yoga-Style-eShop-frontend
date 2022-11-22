import React from 'react'

import './single-collection.style.scss'

const SingleCollection = ({ collection, parentCallback }) => {
  const { _id, title, cover } = collection

  const handlePreviewCollection = () => {
    parentCallback(_id)
  }
  
  return (
    <div className='collection-row' onClick={handlePreviewCollection}>
      <div className='collection-title'>
        {title}
      </div>
      <div className='collection-cover'>
        <img src={`${process.env.BACKEND_URL}/uploads/collections/${cover}`} />
      </div>
    </div>
  )
}

export default SingleCollection