import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'

import CustomButton from 'components/custom-button/custom-button.component'
import SingleCollection from '../../../components/admin/single-collection/single-collection.component'
import PreviewCollection from '../../../components/admin/preview-collection/preview-collection.component'
import AddCollection from '../../../components/admin/add-collection/add-collection.component'
import EditCollection from '../../../components/admin/edit-collection/edit-collection.component'

import { getCollections, getSingleCollection } from '../../../rest-api/collections'
import { Collection } from '../../../shared/types/collections'

import './collections.style.scss'

const Collections = () => {
  const navigate = useNavigate()
  const [collectionsList, setCollectionsList] = useState<Collection[]>([])
  const [isPreviewCollection, setIsPreviewCollection] = useState<boolean>(false)
  const [isAddCollection, setIsAddCollection] = useState<boolean>(false)
  const [isEditCollection, setIsEditCollection] = useState<boolean>(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection>({
    _id: '',
    title: '',
    cover: '',
    active: false
  })

  console.log({navigate})

  const handleAddNewCollection = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPreviewCollection(false)
    setIsAddCollection(true)
  }

  const afterCollectionIsAdded = (isAdded: boolean) => {
    setIsAddCollection(!isAdded)
    getAllCollections()
  }

  const afterSelectForPreview = (collectionId: string) => {
    setIsAddCollection(false)
    setIsPreviewCollection(true)

    getSingleCollection(collectionId).then(response => {
      const updateItem = {
        _id: response.data._id,
        title: response.data.title,
        cover: response.data.cover,
        active: response.data.active
      }
      setSelectedCollection(updateItem)
    }).catch(e => {
      console.log(e)
    })
    
  }

  const selectForEdit = (isForEditing: boolean) => {
    setIsPreviewCollection(false)
    setIsEditCollection(true)
  }
  const afterDelete = (isCollectionDeleted: boolean) => {
    setIsPreviewCollection(false)
    getAllCollections()
  }

  const backToPreview = (showPreview: boolean) => {
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

  console.log({collectionsList})
  return (
    <div className='manage-collections center'>
      {/* <Link to='/admin'>Back to admin home</Link> */}
      {/* <button onClick={() => {navigate(-1)}}>Go back</button> */}
      <div className='page-title left'>
        <h1>Manage Collections</h1>
      </div>
      <div className='add-collection-button'>
        <CustomButton onClick={handleAddNewCollection}>Add Collection</CustomButton>
      </div>
      <div className='collections-list'>
        {/* TODO: add reorder posibility */}
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
        { isAddCollection && 
          <AddCollection 
            parentCallback={afterCollectionIsAdded} 
          /> 
        }
        { isPreviewCollection && 
          <PreviewCollection 
            collection={selectedCollection} 
            callbackForEdit={selectForEdit} 
            callbackAfterDelete={afterDelete} 
          /> 
        }
        { isEditCollection && 
          <EditCollection 
            collection={selectedCollection} 
            parentCallbackBackToPreview={backToPreview} 
          /> 
        }
        { (!isAddCollection && !isPreviewCollection && !isEditCollection) && 
          <h4>Select collection to see details or edit or click "Add Collection" button to add new collection</h4> 
        }
      </div>
    </div>
  )
}

export default Collections