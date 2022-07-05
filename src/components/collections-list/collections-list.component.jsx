import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getCollections } from '../../rest-api/collections'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from '../../redux/collections/collections.actions'

import CollectionItem from '../collection-item/collection-item.component'
import Spinner from '../spinner/spinner.component'

import './collections-list.style.scss';

const CollectionsList = ({ collectionsList, setCollections, setErrorMessage, error }) => {
  const [isFetching, setIsFetching] = useState(false)
 
  
  useEffect(() => {
    setIsFetching(true)
    getCollections().then(response => {
      console.log('collections list:', response.data)
      setCollections(response.data)
      setIsFetching(false)
    }).catch(error => {
      console.log('fetch collections error:', error)
      setErrorMessage(error)
    })
  }, [])

  console.log({isFetching})
  return (
    <div className="collections-list">
      <div className="collection-menu">
        {isFetching ? <Spinner /> :
        collectionsList.map(collection => (
          <CollectionItem key={collection._id} collection={collection} size="large" />
        ))}
      </div>
    </div>
  )}

const mapStateToProps = state => ({
  collectionsList: state.collections.collectionsList,
  errorMessage: state.collections.errorMessage
})

const mapDispatchToProps = dispatch => ({
  setCollections: collections => dispatch(fetchCollectionsSuccess(collections)),
  setErrorMessage: error => dispatch(fetchCollectionsFailure(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsList)