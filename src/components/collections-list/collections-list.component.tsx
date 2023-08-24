import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchActiveCollectionsRequested } from '../../redux/collections/collections.actions'
import { selectCollections, selectIsLoadingCollections } from '../../redux/collections/collections.selectors'
import { Collection } from '../../shared/types/collections'

import CollectionItem from '../collection-item/collection-item.component'
import Spinner from '../spinner/spinner.component'

import './collections-list.style.scss';

const CollectionsList = () => {
  const dispatch = useDispatch()
  const collectionsList: Collection[] = useSelector(selectCollections)
  const isLoading = useSelector(selectIsLoadingCollections)
 
  useEffect(() => {
    dispatch(fetchActiveCollectionsRequested())
  }, [])
  
  return (
    <div className="collections-list">
      {
        isLoading ? (
          <Spinner />
        ) : (
          <div className='collection-menu'>
            {collectionsList.map(collection => (
              <CollectionItem key={collection._id} collection={collection} size="large" />
            ))}
          </div>           
          )
      }
    </div>
  )}

export default CollectionsList