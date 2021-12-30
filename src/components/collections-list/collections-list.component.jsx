import React, { useEffect, useState } from 'react'

import { getCollections } from '../../rest-api/collections'
import CollectionItem from '../collection-item/collection-item.component'

import './collections-list.style.scss';

const CollectionsList = () => {
  const [collectionsList, setCollectionsList] = useState([])

  useEffect(() => {
    getCollections().then(response => {
      setCollectionsList(response.data)
    }).catch(e => {
      console.log({e})
    })
  }, [])

  return (
    <div className="collections-list">
      <div className="collection-menu">
        {collectionsList.map(collection => (
          <CollectionItem key={collection._id} collection={collection} size="large" />
        ))}
      </div>
    </div>
  )}

export default CollectionsList