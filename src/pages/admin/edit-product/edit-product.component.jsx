import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchProductForEditRequested, editProductRequested } from '../../../redux/products/products.actions'
import { selectProduct } from '../../../redux/products/products.selectors'
import { selectCollections } from '../../../redux/collections/collections.selectors'
// import { checkFormDataEntries } from '../../../components/utils/utils'

import CustomInput from '../../../components/custom-input/custom-input.component'
import CustomSelect from '../../../components/custom-select/custom-select.component'
import ProductColorsList from 'components/admin/product-colors-list/product-colors-list.component'
import AddProductColor from 'components/admin/add-product-color/add-product-color.component'
// import EditProductColorData from 'components/admin/edit-product-color-data/edit-product-color-data.component'

import './edit-product.style.scss'

const EditProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const collections = useSelector(selectCollections)
  const product = useSelector(selectProduct)
  const [productData, setProductData] = useState({
    title: '',
    mainImageUrl: '',
    description: '',
    price: 0.00,
    stock: 0,
    collectionId: '',
    active: false,
    colors: []
  })

  const { title, mainImageUrl, description, price, stock, collectionId, active, colors } = productData


  // const [additionalData, setAdditionalImageData] = useState({
  //   color: '',
  //   images: [],
  //   sizes: []
  //   // TODO refactor to use complex inventory
  //   // sizes: [{
  //   //   size: '',
  //   //   stock: 0
  //   // }]
  // })


  // const { color, images, sizes } = additionalData

  const [newMainImageUrl, setNewMainImageUrl] = useState(null)
  const [isNewMainImageUrlSet, setIsNewMainImageUrlSet] = useState(false)

  // console.log({newMainImageUrl})

  const handleSetProductDetails = event => {
    // console.log(event.target.name, event.target.value)
    setProductData({
      ...productData,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeMainImage = event => {
    // console.log('image: ', event.target.files[0])
    if (event.target.files && event.target.files.length > 0) {
      setProductData({
        ...productData,
        [event.target.name]: event.target.files[0]
      }) 
      setNewMainImageUrl(event.target.files[0])
      setIsNewMainImageUrlSet(true)
    }
  }

  const handleSubmitMainInfo = async event => {
    event.preventDefault()
    const formData = new FormData()
    const forUpdate = { title, mainImageUrl, description, price, stock, collectionId, active }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      formData.append(key, value)
    })

    isNewMainImageUrlSet && formData.append('mainImageUrl', newMainImageUrl)

    // checkFormDataEntries(formData)
    dispatch(editProductRequested(params.id, formData, navigate))
  }

  // const handleSubmitAdditionalImageData = async event => {
  //   event.preventDefault()
  //   const formData = new FormData()
    
  //   formData.append('imageUrl', imageUrl)
  //   formData.append('color', color)
    
  //   dispatch(addAdditionalImageToProductRequested(params.id, formData))
  // }

  // const handleSetAdditionalImageData = event => {
  //   console.log(event.target.name, event.target.value)
  //   setAdditionalImageData({
  //     ...additionalImageData,
  //     [event.target.name]: event.target.value
  //   })
  // }

  const handleAddAdditionalImage = event => {
    if (event.target.files && event.target.files.length > 0) {
      setAdditionalImageData({
        ...additionalImageData,
        [event.target.name]: event.target.files[0]
      })
    }
  }

  

  useEffect(() => {
    dispatch(fetchProductForEditRequested(params.id))
  }, [])

  // Set the relation between redux product and local state.
  useEffect(() => {
    setProductData(product)
  }, [product])

  return (
    <div className='edit-product-container center'> 
      <div className='page-title left'>
        <h1>Edit product</h1>
      </div>
      <form className='form-main-info' onSubmit={handleSubmitMainInfo}>
        <label className='main-label'>Product's main info </label>
        <div className='product-main-info'>
          <div className='form-left-box'>
            <CustomInput 
              type='text'
              field='title'
              value={title}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              type='text'
              field='price'
              value={price}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              type='text'
              field='description'
              value={description}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              type='text'
              field='stock'
              value={stock || 0}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomSelect
              type='collections'
              data={collections}
              handler={handleSetProductDetails}
              label='Collection'
              // label={`* ${strings.Collection}`}
              placeholder='Select collection'
              selectname='collectionId'
              value={collectionId}
              extraClasses=''
            ></CustomSelect>
          </div>
          <div className='form-right-box'>
            <CustomInput 
              type='file'
              field='Main Image'
              value={`${process.env.BACKEND_URL}/${mainImageUrl}`}
              accept='image/png image/jpeg image/jpg'
              onChangeHandler={handleChangeMainImage}
            />
          </div>
        </div>
        <div className='button-save-main-info'>
          <button type='submit'>Save changes</button>
        </div>
      </form>
      <div className='additional-information-container'>
        <label className='main-label'>Product's inventory</label>
        <AddProductColor productId={params.id} />
        {/* <EditProductColorData productId={params.id} /> */}

        {/* <div className='button-add-additional-images'>
          <button>Add additional image</button>
        </div> */}
        <div>
        <hr />  
        </div>
        <div>
          {/* <form className='add-additional-image-form' onSubmit={handleSubmitAdditionalImageData}>
            <div className=''>
              <label htmlFor='file'>Image</label>
              <input
                type='file'
                name='imageUrl'
                id='file'
                accept='image/png image/jpeg image/jpg'
                onChange={handleAddAdditionalImage}
                required 
              />
            </div>
            <div className=''>
              <label htmlFor='color'>Color</label>
              <input
                type='text'
                name='color'
                id='color'
                onChange={handleSetAdditionalImageData}
                value={color}
                placeholder='Color'
                required 
              />
            </div>
            <div className=''>
              <button type='submit'>Add additional image</button>
            </div>
          </form> */}
        </div>
        <div className='colors-data-list'>
          {/* <ProductColorsList productId={params.id} colors={colors} /> */}
          <ProductColorsList />
        </div>
        
      </div>

    </div>
  )
}

export default EditProduct