import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCollectionProductsAsync } from '../../redux/products/products.actions'
import { selectSingleCollectionProducts, selectIsLoading } from '../../redux/products/products.selectors'

import ProductPreview from '../../components/product-preview/product-preview.component'
import Spinner from '../../components/spinner/spinner.component'

import './single-collection.style.scss'

const SingleCollection = () => {
  const dispatch = useDispatch()
  const { collection } = useParams()
  const collectionTitle = collection.replace(/-/g, ' ')
  const isLoading = useSelector(selectIsLoading)
  const singleCollectionProductsList = useSelector(selectSingleCollectionProducts)

  useEffect(() => {
    dispatch(fetchCollectionProductsAsync(collectionTitle))
  }, [])

  return (
    <div className='single-collection-preview'>
      <h1 className='title center'>{collectionTitle.toUpperCase()}</h1>
      {
        isLoading ? 
          (<Spinner />) : 
          (<div className='products-container'>
            {singleCollectionProductsList.map(product => (
              <ProductPreview key={product.id} product={product} />
            ))}
          </div>)
      }
    </div>
  )
}

export default SingleCollection
