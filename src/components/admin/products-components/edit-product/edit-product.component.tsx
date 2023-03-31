import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product } from 'shared/types/products'
import { fetchProductForEditRequested, editProductRequested } from '../../../../redux/products/products.actions'
import { selectProduct } from '../../../../redux/products/products.selectors'
import { selectCollections } from '../../../../redux/collections/collections.selectors'
import { displayFormDataEntries } from '../../../../shared/helpers'

import CustomInput from '../../../custom-components/custom-input/custom-input.component'
import CustomSelect from '../../../custom-components/custom-select/custom-select.component'
import ProductColorsList from 'components/admin/products-components/product-colors-list/product-colors-list.component'
import AddProductColor from 'components/admin/products-components/add-product-color/add-product-color.component'
// import EditProductColorData from 'components/admin/products-components/edit-product-color-data/edit-product-color-data.component'

import './edit-product.style.scss'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import { GenericObject } from 'shared/types/common'

const EditProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const collections = useSelector(selectCollections)
  const product: Product | GenericObject = useSelector(selectProduct)
  const [productData, setProductData] = useState(product)
  //   {
  //   title: product ? product.title : '',
  //   mainImageUrl: product ? product.mainImageUrl : '',
  //   description: product ? product.description : '',
  //   price: product ? product.price : 0.00,
  //   stock: product ? product.stock : 0,
  //   collectionId: product ? product.collectionId : '',
  //   active: product ? product.active : false,
  //   colors: product ? product.colors : []
  // }

  const { 
    title, 
    mainImageUrl, 
    description, 
    price, 
    stock, 
    collectionId, 
    active, 
    colors 
  }: Product | GenericObject = productData

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

  const [newMainImageUrl, setNewMainImageUrl] = useState<File>()
  const [isNewMainImageUrlSet, setIsNewMainImageUrlSet] = useState(false)

  // console.log({newMainImageUrl})

  const handleSetProductDetails = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(event.target.name, event.target.value)
    setProductData({
      ...productData,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeMainImage = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log('image: ', event.target.files[0])
    const file: File = (event.target.files as FileList)[0]
    setProductData({
      ...productData,
      [event.target.name]: file
    })
    setNewMainImageUrl(file)
    setIsNewMainImageUrlSet(true)

    // if (event.target.files && event.target.files.length > 0) {
    //   setProductData({
    //     ...productData,
    //     [event.target.name]: event.target.files[0]
    //   }) 
    //   setNewMainImageUrl(event.target.files[0])
    //   setIsNewMainImageUrlSet(true)
    // }
  }

  const handleSubmitMainInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    const forUpdate = { 
      title, 
      mainImageUrl, 
      description, 
      price: JSON.stringify(price), 
      stock: JSON.stringify(stock), 
      collectionId, 
      active: JSON.stringify(active) 
    }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      value && data.append(key, value)
    })

    isNewMainImageUrlSet && newMainImageUrl && data.append('mainImageUrl', newMainImageUrl)

    // displayFormDataEntries(formData)
    params.id && dispatch(editProductRequested(params.id, data, navigate))
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

  // const handleAddAdditionalImage = event => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setAdditionalImageData({
  //       ...additionalImageData,
  //       [event.target.name]: event.target.files[0]
  //     })
  //   }
  // }

  

  useEffect(() => {
    params.id && dispatch(fetchProductForEditRequested(params.id))
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
              label='Title'
              type='text'
              field='title'
              value={title}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              label='Price'
              type='text'
              field='price'
              value={price}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              label='Description'
              type='text'
              field='description'
              value={description}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomInput 
              label='Stock'
              type='text'
              field='stock'
              value={stock || 0}
              onChangeHandler={handleSetProductDetails}
            />
            <CustomSelect
              typeOfData='collections'
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
              label='Image'
              type='file'
              field='Main Image'
              filePath={mainImageUrl}
              accept='image/png image/jpeg image/jpg'
              onChangeHandler={handleChangeMainImage}
            />
          </div>
        </div>
        <div className='button-save-main-info'>
          <CustomButton type='submit'>Save changes</CustomButton>
        </div>
      </form>
      <div className='additional-information-container'>
        <label className='main-label'>Product's inventory</label>
        {params.id &&<AddProductColor productId={params.id} />}
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