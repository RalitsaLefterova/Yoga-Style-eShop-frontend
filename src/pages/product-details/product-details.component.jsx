import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getSingleProduct } from '../../rest-api/products'
import { addToCart } from '../../rest-api/cart'
import { addProduct } from '../../redux/cart/cart.actions'

import './product-details.style.scss'

const ProductDetails = ({ match, history, currentUser, addProduct }) => {
  console.log({currentUser})

  const [productDetails, setProductDetails] = useState({})

  console.log({productDetails})

  const handleAddToCart = () => {
    addToCart(productDetails.id).then(response => {
      console.log('handleAddToCart response', {response})

      if (response && response.response && response.response.status && response.response.status === 401) {
        history.push('/sign-in')
        throw new Error(response.response.data)
      }
      response && addProduct({
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        mainImageUrl: productDetails.mainImageUrl
      })
    }).catch(error => {
      let message = error.message
      console.log('handleAddToCart error', {message})
    })
    
    // console.log('add to cart')
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
      {currentUser ? (
        <button type='button' onClick={handleAddToCart}>Add to cart</button>
      ) : (
        <div><Link to='/sign-in'>Sign in</Link> to start shopping.</div>
      )}
      
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails))
