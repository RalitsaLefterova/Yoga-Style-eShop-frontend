import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product } from 'shared/types/products'
import { fetchProductForEditRequested, editProductRequested } from '../../../../redux/products/products.actions'
import { selectProduct } from '../../../../redux/products/products.selectors'
import { selectCollectionsShortInfo } from '../../../../redux/collections/collections.selectors'
import { displayFormDataEntries } from '../../../../shared/helpers'
import { Collection } from 'shared/types/collections'

import CustomInput from '../../../custom-components/custom-input/custom-input.component'
import CustomSelect from '../../../custom-components/custom-select/custom-select.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import ProductColorsList from 'components/admin/products-components/product-colors-list/product-colors-list.component'
import AddProductColor from 'components/admin/products-components/add-product-color/add-product-color.component'
// import EditProductColorData from 'components/admin/products-components/edit-product-color-data/edit-product-color-data.component'

import './edit-product.style.scss'
import YogaStyleTextEditor from 'components/custom-components/yoga-style-text-editor/yoga-style-text-editor.component'
import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleSelect from 'components/custom-components/yoga-style-select/yoga-style-select.component'

type HandleSetProductData = (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
) => void

const EditProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const collections: Collection[] = useSelector(selectCollectionsShortInfo)
  const product: Product = useSelector(selectProduct)
  const [productData, setProductData] = useState(product)

  const { 
    id: productId,
    title, 
    price, 
    stock, 
    mainImageUrl, 
    collectionId, 
    active, 
    description, 
    colors 
  }: Product = productData

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

  
  const handleSetProductData = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    setProductData((prevProductData) => {
      if (typeof event === 'string') {
        return { ...prevProductData, description: event };
      } else {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
        return { ...prevProductData, [name]: value };
      }
    });
  };
  
  const handleSetProductDetails = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleSetProductData(event);
  };
  
  const handleSetProductDescription = (value: string) => {
    handleSetProductData(value);
  };

  // const handleSetProductDetails = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   setProductData({
  //     ...productData,
  //     [event.target.name]: event.target.value
  //   })
  // }

  // const handleSetProductDescription = (value: string) => {
  //   setProductData({...productData, description: value})
  // }

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
      price: price.toString(), 
      stock: stock.toString(), 
      collectionId, 
      active: JSON.stringify(active) 
    }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      value && data.append(key, value)
    })

    isNewMainImageUrlSet && newMainImageUrl && data.append('mainImageUrl', newMainImageUrl)

    // displayFormDataEntries(formData)
    params.id && dispatch(editProductRequested(productId, data, navigate))
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

  console.log({productData})

  return (
    <div className='edit-product-container center'> 
      <div className='page-title left'>
        <h1>Edit product</h1>
      </div>
      <div className='product-main-information-container'>
        <label className='main-label'>Product's main info </label>
        <form className='form-main-info' onSubmit={handleSubmitMainInfo}>
          <YogaStyleInput 
            labelText='Title'
            inputType='text'
            fieldName='title'
            inputValue={title}
            onChangeHandler={handleSetProductDetails}
          />
          <YogaStyleInput 
            labelText='Price'
            inputType='text'
            fieldName='price'
            inputValue={price}
            onChangeHandler={handleSetProductDetails}
          />
          <YogaStyleInput 
            labelText='Stock'
            inputType='text'
            fieldName='stock'
            inputValue={stock || 0}
            onChangeHandler={handleSetProductDetails}
          />
          <YogaStyleSelect 
            typeOfData='collections'
            data={collections}
            handler={handleSetProductDetails}
            labelText='Collection'
            // label={`* ${strings.Collection}`}
            placeholder='Select collection'
            selectName='collectionId'
            value={collectionId}
            extraClasses=''
          />
          <YogaStyleTextEditor 
            fieldName='description'
            labelText='Description'
            editorValue={description}
            onChange={handleSetProductDescription}
          />
          <YogaStyleInput 
            labelText='Image'
            inputType='file'
            fieldName='Main Image'
            filePath={mainImageUrl}
            accept='image/png image/jpeg image/jpg'
            onChangeHandler={handleChangeMainImage}
          />
          <div className='button-save-main-info'>
            <CustomButton type='submit'>Save changes</CustomButton>
          </div>
        </form>
      </div>
      
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