import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  DndContext,
  closestCenter
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { fetchCollectionsRequested, fetchSingleCollectionRequested } from 'redux/collections/collections.actions'
import { selectCollections, selectSelectedCollection } from 'redux/collections/collections.selectors'
import { Collection } from '../../../../shared/types/collections'

import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import SortableItem from 'components/sortable-item/sortable-item.component'
import CollectionsList from 'components/admin/collections-components/collections-list/collections-list.component'
import CollectionItem from '../collection-item/collection-item.component'
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
  
  const afterDelete = (isCollectionDeleted: boolean) => {
    setIsPreviewCollection(!isCollectionDeleted)
  }

  useEffect(() => {
    dispatch(fetchCollectionsRequested())
  }, [])

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
      <div className='collections-list'>
        <CollectionsList collections={collectionsList} parentCallback={goToPreview} />
        
        {/* TODO: add reorder posibility */}
        {/* { collectionsList.length > 0 ? 
          collectionsList.map(collection => (
          <SingleCollectionPreview 
            key={collection._id} 
            collectionData={collection} 
            parentCallback={goToPreview}
          />)) : 
          'There are no collections added yet.'} */}
      </div>
      <div className='add-edit-collection-section'>
        { isPreviewCollection ? 
          <CollectionPreview
            collection={selectedCollection}
            callbackAfterDelete={afterDelete} 
          /> 
          :
          <h4>Select collection to see details <br /> or click "Add Collection" button to add new collection.</h4>
        }
      </div>
    </div>
  )
}

export default Collections