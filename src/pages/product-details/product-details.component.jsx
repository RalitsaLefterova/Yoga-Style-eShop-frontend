import React, { useEffect, Fragment } from 'react'
import { withRouter, Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProductRequested } from '../../redux/products/products.actions'
import { addProductToCartAsync } from '../../redux/cart/cart.actions'
import { selectProduct, selectIsLoading } from '../../redux/products/products.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import Spinner from '../../components/spinner/spinner.component'

import './product-details.style.scss'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const productDetails = useSelector(selectProduct)
  const isLoading = useSelector(selectIsLoading)

  const handleAddToCart = () => {
    dispatch(addProductToCartAsync(productDetails.id))
  }

  useEffect(() => {
    dispatch(fetchProductRequested(params.productId))
  }, [])

  return (
    <div className='product-details-container'>
      {
        isLoading ? 
          (<Spinner />) : 
          (<Fragment>
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
          </Fragment>)
      }
    </div>
  )
}

export default ProductDetails
