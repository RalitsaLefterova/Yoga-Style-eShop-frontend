import React, { useState } from 'react'

import { createCollection } from '../../../rest-api/collections'

const AddCollection = ({ parentCallback }) => {
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState()

  const handleChangeCover = event => {
    setCover(event.target.files[0])
  }

  const handleChangeTitle = event => {
    setTitle(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const data = new FormData()
    data.append('title', title)
    data.append('cover', cover)
    
    // const collectionResponse = await createCollection(data)
    await createCollection(data)
    parentCallback(true)
  }

  return (
    <div className='add-collection'>
      <div>Add new collection</div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name='title'
            id="title"
            onChange={handleChangeTitle}
            value={title}
          />
        </div>
        <div className="flex">
          <label htmlFor="file">File</label>
          <input
            type="file"
            name='cover'
            id="file"
            onChange={handleChangeCover} 
            accept='image/png image/jpeg image/jpg'
          />
        </div>
        <button type='submit'>Add collection</button>
      </form>
    </div>
  )
}

export default AddCollection