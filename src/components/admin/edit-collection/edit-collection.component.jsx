import React, { useState, useEffect } from 'react'

import { getSingleCollection } from '../../../rest-api/collections'

const EditCollection = ({ collection, parentCallback }) => {
  // const [title, setTitle] = useState(collection.title)
  // const [cover, setCover] = useState(collection.cover)

  const handleChangeCover = () => {

  }

  const handleEdit = () => {

    // TODO Edit collection code here!!!
    
    parentCallback(true)
  }

  return  (
    <div>
      <div>{collection.title}</div>
      <div>
        <input type='checkbox' checked={collection.active} />
      </div>
      <img src={collection.cover} alt='collection-cover' />
      <input 
          type='file' 
          name='cover' 
          onChange={handleChangeCover} 
          accept='image/png image/jpeg image/jpg'
        />
      <button onClick={handleEdit}>Save</button>
    </div>
  )

}

export default EditCollection