import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { getCollectionProducts } from '../../rest-api/products'
import ProductPreview from '../../components/product-preview/product-preview.component'

import './single-collection.style.scss'

const SingleCollection = ({ match, history }) => {
  const [collectionProducts, setCollectionProducts] = useState([])
  const collectionTitle = match.params.collection.replace(/-/g, ' ')

  useEffect(() => {
    getCollectionProducts(collectionTitle).then(response => {
      console.log('response.data', response.data)
      setCollectionProducts(response.data)
    }).catch(e => console.log({e}))
  }, [])

  return (
    <div className='single-collection-preview'>
      <h1 className='title center'>{collectionTitle.toUpperCase()}</h1>
      <div className=''>
        {collectionProducts.map(product => (
          <ProductPreview key={product._id} product={product} />
        ))}
      </div>
      {/* <CustomButton onClick={() => addItem(item)} inverted>Add to cart</CustomButton> */}
    </div>
  )
}

export default withRouter(SingleCollection)
