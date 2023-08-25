import { FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteCollectionRequested } from 'redux/collections/collections.actions'
import { selectError } from 'redux/collections/collections.selectors'
import { Collection } from 'shared/types/collections'

import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './collection-preview.style.scss'

type PreviewCollectionType = {
  collection: Collection
}

const CollectionPreview = ({ collection }: PreviewCollectionType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { _id: collectionId, title, cover } = collection
  const error = useSelector(selectError)

  const handleStartEditing = () => {
    navigate(`${pathname}/edit/${collectionId}`)
  }

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault()
    collectionId && dispatch(deleteCollectionRequested(collectionId))
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
      {error && <ErrorContainer error={error} />}
      <div className='buttons-container center'>
        <YogaStyleButton onClick={handleStartEditing} >Edit</YogaStyleButton>
        <YogaStyleButton onClick={handleDelete} extraClasses='delete-btn-style' >Delete</YogaStyleButton>
      </div>
    </div>
  )
}

export default CollectionPreview