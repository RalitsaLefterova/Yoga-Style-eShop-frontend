import React, { useState, useEffect } from 'react'

import SingleCollection from '../../../components/admin/single-collection/single-collection.component'
import PreviewCollection from '../../../components/admin/preview-collection/preview-collection.component'
import AddCollection from '../../../components/admin/add-collection/add-collection.component'
import EditCollection from '../../../components/admin/edit-collection/edit-collection.component'

import { getCollections } from '../../../rest-api/collections'

import './collections.style.scss'

const Collections = () => {
  const [collectionsList, setCollectionsList] = useState([])
  const [isPreviewCollection, setIsPreviewCollection] = useState(false)
  const [isAddCollection, setIsAddCollection] = useState(false)
  const [isEditCollection, setIsEditCollection] = useState(false)
  const [selectedCollection, setselectedCollection] = useState({
    id: '',
    title: '',
    cover: '',
    active: false
  })

  const handleAddNewCollection = e => {
    e.preventDefault()
    setIsPreviewCollection(false)
    setIsAddCollection(true)
  }

  const afterCollectionIsAdded = (isAdded) => {
    setIsAddCollection(!isAdded)
  }

  const afterSelectForPreview = (collectionId) => {
    setIsAddCollection(false)
    setIsPreviewCollection(true)

    const collectionResult = collectionsList.find(collection => collection._id === collectionId)
    const updateItem = {
      id: collectionResult._id,
      title: collectionResult.title,
      cover: collectionResult.cover,
      active: collectionResult.active
    }

    setselectedCollection(updateItem)
  }

  const selectForEdit = (isForEditing) => {
    setIsPreviewCollection(false)
    setIsEditCollection(true)
  }

  const afterBeenEdited = (hasBeenEdited) => {
    setIsEditCollection(!hasBeenEdited)
  }

  useEffect(() => {
    getCollections().then(response => {
      setCollectionsList(response.data)
    }).catch(e => {
      console.log({e})
    })
  }, [])

  return (
    <div className='manage-collections'>
      <div className='page-title'>
        <h3>Manage Collections</h3>
      </div>
      <div className='add-collection-button'>
        <button onClick={handleAddNewCollection}>Add Collection</button>
      </div>
      <div className='collections-list'>
        {/* add sorting: alphabetically and create date */}
        { collectionsList.length > 0 ? 
          collectionsList.map(collection => (
          <SingleCollection 
            key={collection._id} 
            collection={collection} 
            parentCallback={afterSelectForPreview}
          />)) : 
          'There are no collections added yet.'}
      </div>
      <div className='add-edit-collection'>
        {
        isAddCollection ? <AddCollection parentCallback={afterCollectionIsAdded} /> : 
        isPreviewCollection ? <PreviewCollection collection={selectedCollection} parentCallback={selectForEdit} /> :
        isEditCollection ? <EditCollection collection={selectedCollection} parentCallback={afterBeenEdited} /> :
        <h4>Select collection to see details or edit or click "Add Collection" button to add new collection</h4>
        }
        
      </div>
    </div>
  )
}

export default Collections