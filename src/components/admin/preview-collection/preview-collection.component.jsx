import React from 'react'

import { deleteCollection } from '../../../rest-api/collections'

import './preview-collection.style.scss'

const PreviewCollection = ({ collection, callbackForEdit, callbackAfterDelete }) => {

  const handleStarEditing = () => {
    callbackForEdit(true)
  }

  const handleDelete = () => {
    deleteCollection(collection.id).then(response => {
      console.log(response)
      callbackAfterDelete(true)
    }).catch(e => {
      console.log(e)
    })
    
  }

  return (
    <div>
      <div>
        <h4>Collection Preview</h4>
      </div>
      <div>
        {collection.title}
      </div>
      <div className='collection-image-box'>
        <img src={`${process.env.BACKEND_URL}/uploads/collections/${collection.cover}`} alt='collection cover' />
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