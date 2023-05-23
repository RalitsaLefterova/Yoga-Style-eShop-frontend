import { useState, useEffect, Fragment, ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProductRequested } from '../../redux/products/products.actions'
import { addProductToCartRequested } from '../../redux/cart/cart.actions'
import { selectProduct, selectIsLoading } from '../../redux/products/products.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { Product, ProductColor } from 'shared/types/products'
import { GenericObject } from 'shared/types/common'
import { formatCurrency } from 'shared/helpers'

import Spinner from '../../components/spinner/spinner.component'
import CustomSelect from 'components/custom-components/custom-select/custom-select.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'

import './product-details.style.scss'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const currentUser = useSelector(selectCurrentUser)

  const productDetails = useSelector(selectProduct)
  const { title, price, mainImageUrl, colors }: Product | GenericObject = productDetails
  
  const [selectedColor, setSelectedColor] = useState<ProductColor>()
  const [activeColorImages, setActiveColorImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState('')
  const [mainImage, setMainImage] = useState(mainImageUrl)

  const handleAddToCart = () => {
    // TODO: construct the link in the cart to load the choosen combination of size and color

    // const data = { color: selectedColor._id, size: selectedSize._id }
    dispatch(addProductToCartRequested(productDetails.id))
  }

  const changeColorImages = (event: ChangeEvent<HTMLSelectElement>) => {
    const colorId: string = event.target.value
    const newSelectedColor: ProductColor = (colors as ProductColor[]) && colors.find((colorItem: ProductColor) => colorItem._id === colorId)

    if (newSelectedColor) {
      setSelectedColor(newSelectedColor)
      setActiveColorImages(newSelectedColor.images)
    }
  }

  const selectImage = (index: number) => {
    setMainImage(activeColorImages[index])
  }

  useEffect(() => {
    console.log('--- fetch product details ---')
    params.productId && dispatch(fetchProductRequested(params.productId))
  }, [])

  useEffect(() => {
    console.log('--- set main image ---')
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

              {/* {colors && colors.length > 0 && (
                <div>
                  <span>Color: </span>
                  <select name='color' onChange={changeColorImages} defaultValue=''>
                    <option value="" disabled >Select color</option>
                    {colors && colors.map((colorItem: ProductColor) => 
                      <option key={colorItem._id} value={colorItem._id}>
                        {colorItem.color}
                      </option>)
                    }
                  </select>
                </div>
              )} */}

              {colors && colors.length > 0 && (
                <div>
                  <CustomSelect
                    data={colors}
                    typeOfData='colors'
                    placeholder='Select color'
                    selectname='color'
                    labelText='Color:'
                    handler={changeColorImages}
                  />
                </div>
              )}

              {/* TODO: when choose color load sizes if available */}

              <div>Price: {formatCurrency(price)}</div>

              <div className='add-to-cart-btn'>
                {currentUser ? (
                   <CustomButton type='button' onClick={handleAddToCart}>
                    Add to cart
                  </CustomButton>
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
