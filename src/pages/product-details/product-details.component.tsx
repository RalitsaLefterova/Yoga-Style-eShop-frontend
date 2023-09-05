import { useState, useEffect, Fragment, ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProductRequested } from '../../redux/products/products.actions'
import { addProductToCartRequested } from '../../redux/cart/cart.actions'
import { selectProduct, selectIsLoading } from '../../redux/products/products.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { Product, ProductColor } from 'shared/types/products'
import { formatCurrency } from 'shared/helpers'

import Spinner from '../../components/spinner/spinner.component'
import CustomSelect from 'components/custom-components/custom-select/custom-select.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'

import './product-details.style.scss'
import YogaStyleSelect from 'components/custom-components/yoga-style-select/yoga-style-select.component'

const ProductDetails = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const currentUser = useSelector(selectCurrentUser)

  const productDetails = useSelector(selectProduct)
  const { title, price, mainImageUrl, colors, description }: Product = productDetails
  
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
    const newSelectedColor = colors && colors.find((colorItem: ProductColor) => colorItem._id === colorId)

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
    <div className='product-details-page'>
      {
        isLoading ? 
          (<Spinner />) : 
          (<div className='product-container'>
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
            <div className='product-info-container'>

              <div className='product-title'>
                {title}
              </div>

              {colors && colors.length > 0 && (
                <div>
                  <YogaStyleSelect
                    data={colors}
                    typeOfData='colors'
                    placeholder='Select color'
                    selectName='color'
                    labelText='Color:'
                    handler={changeColorImages}
                  />
                </div>
              )}

              {/* TODO: when choose color load sizes if available */}

              <div className='flex flex-direction-column align-flex-start'>
                <div className='padding-top-bottom-20'>
                  Price: <strong>{formatCurrency(price)}</strong>
                </div>
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

            </div>
            <div className='product-description-container'>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>)
      }
    </div>
  )
}

export default ProductDetails
