import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCollectionsRequested, fetchSingleCollectionRequested } from 'redux/collections/collections.actions'
import { selectCollections, selectSelectedCollection } from 'redux/collections/collections.selectors'
import { Collection } from '../../../../shared/types/collections'

import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import CollectionsList from 'components/admin/collections-components/collections-list/collections-list.component'
import CollectionPreview from '../collection-preview/collection-preview.component'

import './collections.style.scss'

export type reduceFunctionType = {
  acc: [],
  collection: Collection
}

const Collections = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const collectionsList: Collection[] = useSelector(selectCollections)
  const selectedCollection: Collection = useSelector(selectSelectedCollection)
  const [isPreviewCollection, setIsPreviewCollection] = useState(false)

  const goToPreview = async (collectionId: string) => {
    dispatch(fetchSingleCollectionRequested(collectionId))
    setIsPreviewCollection(true)
  }

  useEffect(() => {
    dispatch(fetchCollectionsRequested())
  }, [])

  useEffect(() => {
    if (!collectionsList.some(collection => collection._id === selectedCollection._id)) {
      setIsPreviewCollection(false)
    }
  }, [collectionsList, selectedCollection])

  return (
    <div className='manage-collections center'>
      {/* <Link to='/admin'>Back to admin home</Link> */}
      {/* <button onClick={() => {navigate(-1)}}>Go back</button> */}
      <div className='page-title left'>
        <h1>Manage Collections</h1>
      </div>
      <div className='add-collection-button-container'> 
        <YogaStyleButton
          onClick={() => navigate(`${pathname}/add`)}
        >
          Add Collection
          </YogaStyleButton>
      </div>
      {collectionsList.length === 0 ? (
        <div className='full-width padding-top-bottom-20'>
          Currently, no collections have been added.
        </div>
      ) : (
        <>
          <div className='collections-list'>
            <div className='padding-top-bottom-20'>
              Customize the Collection Order: Simply drag and drop to arrange collections as you prefer.
            </div>
            <CollectionsList collections={collectionsList} parentCallback={goToPreview} />
          </div>
          <div className='add-edit-collection-section'>
            { isPreviewCollection ? 
              <CollectionPreview collection={selectedCollection} /> 
              :
              <h2>
                Choose a collection to view details. <br />
                Create a new collection using the 'Add Collection' button. <br />
                While previewing, you can edit or delete using buttons. <br />
                For making a collection visible to e-shop users, 
                access the edit page where you'll find an 'Active' checkbox.  
              </h2>
            }
          </div>
        </>
      )}
    </div>
  )
}

export default Collections