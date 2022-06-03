import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { getSingleProduct } from '../../rest-api/products'

import './product-details.style.scss'

const ProductDetails = ({ match, history }) => {
  const [productDetails, setProductDetails] = useState({})

  const addToCart = id => {
    console.log('add to cart')
  }

  useEffect(() => {
    getSingleProduct(match.params.productId).then(response => {
      setProductDetails(response.data)
    })
  }, [])

  return (
    <div className='product-details-container'>
      <div 
        className='product-main-image'
        style={{
          backgroundImage: `url(${productDetails.mainImageUrl})`
        }}
      />
      <div className='product-info'>
        <div className='product-title'>{productDetails.title}</div>
        <div>Price: {productDetails.price}</div>
      </div>
      <button type='button' onClick={() => addToCart(productDetails)}>Add to cart</button>
    </div>
  )
}

export default withRouter(ProductDetails)
