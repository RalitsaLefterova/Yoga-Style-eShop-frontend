import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'

import SingleCollection from '../../../components/admin/single-collection/single-collection.component'
import PreviewCollection from '../../../components/admin/preview-collection/preview-collection.component'
import AddCollection from '../../../components/admin/add-collection/add-collection.component'
import EditCollection from '../../../components/admin/edit-collection/edit-collection.component'

import { getCollections, getSingleCollection } from '../../../rest-api/collections'

import './collections.style.scss'

const Collections = ({history}) => {
  const [collectionsList, setCollectionsList] = useState([])
  const [isPreviewCollection, setIsPreviewCollection] = useState(false)
  const [isAddCollection, setIsAddCollection] = useState(false)
  const [isEditCollection, setIsEditCollection] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState({
    id: '',
    title: '',
    cover: '',
    active: false
  })

  console.log(history)

  const handleAddNewCollection = e => {
    e.preventDefault()
    setIsPreviewCollection(false)
    setIsAddCollection(true)
  }

  const afterCollectionIsAdded = (isAdded) => {
    setIsAddCollection(!isAdded)
    getAllCollections()
  }

  const afterSelectForPreview = (collectionId) => {
    setIsAddCollection(false)
    setIsPreviewCollection(true)

    getSingleCollection(collectionId).then(response => {
      const updateItem = {
        id: response.data._id,
        title: response.data.title,
        cover: response.data.cover,
        active: response.data.active
      }
      setSelectedCollection(updateItem)
    }).catch(e => {
      console.log(e)
    })
    
  }

  const selectForEdit = (isForEditing) => {
    setIsPreviewCollection(false)
    setIsEditCollection(true)
  }
  const afterDelete = (isCollectionDeleted) => {
    setIsPreviewCollection(false)
    getAllCollections()
  }

  const backToPreview = (showPreview) => {
    setIsPreviewCollection(showPreview)
    setIsEditCollection(!showPreview)
  }

  const getAllCollections = () => {
    getCollections().then(response => {
      setCollectionsList(response.data)
    }).catch(e => {
      console.log({e})
    })
  }

  useEffect(() => {
    getAllCollections()
  }, [])

  return (
    <div className='manage-collections center'>
      <Link to='/admin'>Back to home</Link>
      <button onClick={() => {history.goBack();}}>Go back</button>
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
        isPreviewCollection ? <PreviewCollection collection={selectedCollection} callbackForEdit={selectForEdit} callbackAfterDelete={afterDelete} /> :
        isEditCollection ? <EditCollection collection={selectedCollection} parentCallbackBackToPreview={backToPreview} /> :
        <h4>Select collection to see details or edit or click "Add Collection" button to add new collection</h4>
        }
        
      </div>
    </div>
  )
}

export default withRouter(Collections)