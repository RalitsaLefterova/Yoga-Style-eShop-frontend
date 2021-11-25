import React from 'react'

import './preview-collection.style.scss'

const PreviewCollection = ({ collection, parentCallback }) => {

  const handleStarEditing = () => {
    parentCallback(true)
  }

  const handleDelete = () => {

  }

  return (
    <div>
      <div>
        <h4>Collection Preview</h4>
      </div>
      <div>
        {collection.title}
      </div>
      <div>
        <img src={collection.cover} alt='collection-cover' />
      </div>
      <div>
        <button onClick={handleStarEditing}>Edit</button>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default PreviewCollection