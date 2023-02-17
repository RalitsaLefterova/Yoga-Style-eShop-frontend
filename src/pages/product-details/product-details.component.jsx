import React, { useState, useEffect, Fragment } from 'react'
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
  const isLoading = useSelector(selectIsLoading)
  const currentUser = useSelector(selectCurrentUser)

  const productDetails = useSelector(selectProduct)
  const { title, price, mainImageUrl, colors } = productDetails
  
  const [selectedColor, setSelectedColor] = useState('')
  const [activeColorImages, setActiveColorImages] = useState([])
  const [selectedImage, setSelectedImage] = useState('')
  const [mainImage, setMainImage] = useState(mainImageUrl)

  const handleAddToCart = () => {
    // TODO: construct the link in the cart to load the choosen combination of size and color
    // const data = { color: selectedColor._id, size: selectedSize._id }
    dispatch(addProductToCartRequested(productDetails.id))
  }

  const changeColorImages = event => {
    const colorId = event.target.value
    const selectedColor = colors.find(colorItem => colorItem._id === colorId)

    setSelectedColor(selectedColor)
    setActiveColorImages(selectedColor.images)
  }

  const selectImage = index => {
    setMainImage(activeColorImages[index])
  }

  useEffect(() => {
    dispatch(fetchProductRequested(params.productId))
  }, [])

  useEffect(() => {
    setMainImage(activeColorImages[0])
  }, [activeColorImages])

  return (
    <div className='product-details-container'>
      {
        isLoading ? 
          (<Spinner />) : 
          (<Fragment>
            <div className='images-container'>
              <div 
                className='product-main-image'
                style={{
                  backgroundImage: `url(${process.env.BACKEND_URL}/${mainImage ? mainImage : mainImageUrl})`
                }}
              />
              <div className='selected-color-image-container'>
                {activeColorImages.length > 0 && activeColorImages.map((image, index) =>
                  <div 
                    key={index}
                    className={`img-box ${mainImage == image ? 'selected' : ''}`}
                    style={{
                      backgroundImage: `url(${process.env.BACKEND_URL}/${image})`
                    }}
                    onClick={() => selectImage(index)}
                  />
                )}
              </div>
            </div>
            <div className='product-info'>

              <div className='product-title'>
                {title}
              </div>

              <div>
                <span>Color: </span>
                <select name='color' onChange={changeColorImages}>
                  <option>Select color</option>
                  {colors.map(colorItem => 
                    <option key={colorItem._id} value={colorItem._id}>
                      {colorItem.color}
                    </option>)
                  }
                </select>
              </div>

              {/* <div>
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
              </div> */}


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
