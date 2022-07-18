import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCollectionsRequested } from '../../redux/collections/collections.actions'
import { selectCollections, selectIsLoadingCollections } from '../../redux/collections/collections.selectors'

import CollectionItem from '../collection-item/collection-item.component'
import Spinner from '../spinner/spinner.component'

import './collections-list.style.scss';

const CollectionsList = () => {
  const dispatch = useDispatch()
  const collectionsList = useSelector(selectCollections)
  const isLoading = useSelector(selectIsLoadingCollections)
 
  useEffect(() => {
    dispatch(fetchCollectionsRequested())
  }, [])
  
  return (
    <div className="collections-list">
      <div className="collection-menu">
        {
          isLoading ? (<Spinner />) : (
          collectionsList.map(collection => (
            <CollectionItem key={collection._id} collection={collection} size="large" />
          )))
        }
      </div>
    </div>
  )}

export default CollectionsList