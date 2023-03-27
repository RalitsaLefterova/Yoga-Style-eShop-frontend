import { FormEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { deleteCollectionRequested } from 'redux/collections/collections.actions'
import { Collection } from 'shared/types/collections'

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
    <div>
      <div>
        <h4>Collection Preview</h4>
      </div>
      <div>
        {collection.title}
      </div>
      <div className='collection-image-box'>
        <img src={`${process.env.BACKEND_URL}/${cover}`} alt={`collection ${title}`} />
      </div>
      <div>
        <button onClick={handleStartEditing}>Edit</button>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default CollectionPreview