import React, { useState } from 'react'

import { editCollection } from '../../../rest-api/collections'

const EditCollection = ({ collection, parentCallbackBackToPreview }) => {
  const [title, setTitle] = useState(collection.title)
  const [cover, setCover] = useState(collection.cover)
  const [newCover, setNewCover] = useState(null)
  const [isNewCoverSet, setIsNewCoverSet] = useState(false)
  const [active, setActive] = useState(collection.active)
  const [isActiveEdited, setIsActiveEdited] = useState(false)

  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }

  const handleChangeCover = e => {
    if (e.target.files && e.target.files.length > 0) {
      setCover(URL.createObjectURL(e.target.files[0]))
      setNewCover(e.target.files[0])
      setIsNewCoverSet(true)
    }
  }

  const handleChangeActive = e => {
    setActive(e.target.checked)
    setIsActiveEdited(true)
  }

  const handleEdit = event => {
    event.preventDefault()

    const collectionId = collection.id

    const data = new FormData()

    data.append('title', title)
    
    if (isNewCoverSet) {
      data.append('cover', newCover)
    }
    
    if (isActiveEdited) {
      data.append('active', active)
    }
    
    editCollection(collectionId, data).then(response => {
      console.log(response)
    }).catch(e => console.log(e))
    
    parentCallbackBackToPreview(true)
  }

  const handleCancel = () => {
    parentCallbackBackToPreview(true)
  }

  return  (
    <div>
      <div>
        <input value={title} onChange={handleChangeTitle} /> 
      </div>
      <div>
        <input type='checkbox' checked={active} onChange={handleChangeActive} />
      </div>
      <img src={cover} alt='collection-cover' />
      <input 
          type='file' 
          name='cover' 
          onChange={handleChangeCover} 
          accept='image/png image/jpeg image/jpg'
        />
      <button onClick={handleEdit}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  )

}

export default EditCollection