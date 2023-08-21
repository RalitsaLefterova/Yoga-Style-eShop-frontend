import { FormEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { deleteCollectionRequested } from 'redux/collections/collections.actions'
import { Collection } from 'shared/types/collections'

import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'

import './collection-preview.style.scss'

type PreviewCollectionType = {
  collection: Collection
  callbackAfterDelete: (isCollectionDeleted: boolean) => void
}

const CollectionPreview = ({ collection, callbackAfterDelete }: PreviewCollectionType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { _id: collectionId, title, cover } = collection

  const handleStartEditing = () => {
    // callbackForEdit(true)
    navigate(`${pathname}/edit/${collectionId}`)
  }

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault()
    try {
      collectionId && dispatch(deleteCollectionRequested(collectionId))
      callbackAfterDelete(true)
    } catch (error) {
      console.log('delete collection failed', error)
    }
  }

  return (
    <div className='collection-preview-container'>
      <div className='section-title center'>
        <h2>Collection Preview</h2>
      </div>
      <div className='capitalize-text padding-top-bottom-20'>
        <h1>"{collection.title}"</h1>
      </div>
      <div className='collection-image-box center'>
        <img src={`${process.env.BACKEND_URL}/${cover}`} alt={`collection ${title}`} />
      </div>
      <div className='buttons-container center'>
        <YogaStyleButton onClick={handleStartEditing} >Edit</YogaStyleButton>
        <YogaStyleButton onClick={handleDelete} extraClasses='delete-btn-style' >Delete</YogaStyleButton>
      </div>
    </div>
  )
}

export default CollectionPreview