import React, { useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProductRequested } from '../../redux/products/products.actions'
import { addProductToCartRequested } from '../../redux/cart/cart.actions'
import { selectProduct, selectIsLoading } from '../../redux/products/products.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import Spinner from '../../components/spinner/spinner.component'
import CustomSelect from 'components/custom-select/custom-select.component'

import './product-details.style.scss'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const productDetails = useSelector(selectProduct)
  const isLoading = useSelector(selectIsLoading)

  const { title, price, mainImageUrl } = productDetails

  const handleAddToCart = () => {
    // TODO: construct the link in the cart to load the choosen combination of size and color
    dispatch(addProductToCartRequested(productDetails.id))
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
                backgroundImage: `url(${mainImageUrl})`
              }}
            />
            <div className='product-info'>

              <div className='product-title'>
                {title}
              </div>

              <div>
                <span>Size: </span>
                <select>
                  <option>Select size</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </select>
              </div>

              <div>
                <span>Color: </span>
                <select>
                  <option>Select color</option>
                  <option>red</option>
                  <option>blue</option>
                  <option>yellow</option>
                  <option>violet</option>
                  <option>pink</option>
                  <option>black</option>
                </select>
              </div>

              <div>Price: {price}</div>

              <div className='add-to-cart-btn'>
                {currentUser ? (
                  <button type='button' onClick={handleAddToCart}>Add to cart</button>
                ) : (
                  <span>
                    <Link to='/sign-in'>Sign in</Link> to start shopping.
                  </span>
                )}
              </div>
            </div>
          </Fragment>)
      }
    </div>
  )
}

export default ProductDetails
