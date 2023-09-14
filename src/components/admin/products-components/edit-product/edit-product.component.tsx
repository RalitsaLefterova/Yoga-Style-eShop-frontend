import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Product } from 'shared/types/products'
import { fetchProductForEditRequested, editProductRequested } from '../../../../redux/products/products.actions'
import { selectError, selectProduct } from '../../../../redux/products/products.selectors'
import { selectCollectionsShortInfo } from '../../../../redux/collections/collections.selectors'
import { CollectionShortInfo } from 'shared/types/collections'
import { displayFormDataEntries } from '../../../../shared/helpers'

import ProductColorsList from 'components/admin/products-components/product-colors-list/product-colors-list.component'
import AddProductColor from 'components/admin/products-components/add-product-color/add-product-color.component'
// import EditProductColorData from 'components/admin/products-components/edit-product-color-data/edit-product-color-data.component'
import YogaStyleTextEditor from 'components/custom-components/yoga-style-text-editor/yoga-style-text-editor.component'
import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleSelect from 'components/custom-components/yoga-style-select/yoga-style-select.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './edit-product.style.scss'

type HandleSetProductData = (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
) => void

const EditProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const collections: CollectionShortInfo[] = useSelector(selectCollectionsShortInfo)
  const product: Product = useSelector(selectProduct)
  const [productData, setProductData] = useState(product)
  const [newMainImageUrl, setNewMainImageUrl] = useState<File>()
  const [isNewMainImageUrlSet, setIsNewMainImageUrlSet] = useState(false)

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

  const handleSetProductData = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    setProductData((prevProductData) => {
      if (typeof event === 'string') {
        return { ...prevProductData, description: event };
      } else {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
        return { ...prevProductData, [name]: value };
      }
    })
  }
  
  const handleSetProductDetails = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleSetProductData(event);
  }
  
  const handleSetProductDescription = (value: string) => {
    handleSetProductData(value);
  }

  const handleChangeMainImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0]
    setProductData({
      ...productData,
      [event.target.name]: file
    })
    setNewMainImageUrl(file)
    setIsNewMainImageUrlSet(true)
  }

  const handleSubmitMainInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    const forUpdate = { 
      title,
      description, 
      price: price.toString(), 
      stock: stock.toString(), 
      collectionId, 
      active: JSON.stringify(active) 
    }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      // console.log({key}, {value})
      // if (value !== undefined && value !== null) {
      //   data.append(key, value)
      // }
      data.append(key, value)
    })

    isNewMainImageUrlSet && newMainImageUrl && data.append('mainImageUrl', newMainImageUrl)

    console.log(displayFormDataEntries(data))
    params.id && dispatch(editProductRequested(productId, data, navigate))
  }

  useEffect(() => {
    params.id && dispatch(fetchProductForEditRequested(params.id))
  }, [])

  // Set the relation between redux product and local state.
  useEffect(() => {
    setProductData(product)
  }, [product])

  console.log({productData}, {error})

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
          <div className='flex flex-direction-row gap-20'>
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
            <YogaStyleInput 
              labelText='Price'
              inputType='number'
              fieldName='price'
              inputValue={price}
              onChangeHandler={handleSetProductDetails}
              min='0.00' 
              max='10000.00' 
              step='0.01'
            />
            <YogaStyleInput 
              labelText='Stock'
              inputType='number'
              fieldName='stock'
              inputValue={stock || 0}
              onChangeHandler={handleSetProductDetails}
              min='0'
            />
          </div>
          <YogaStyleTextEditor 
            fieldName='description'
            labelText='Description'
            editorValue={description}
            onChange={handleSetProductDescription}
          />
          <YogaStyleInput 
            labelText='Main Image'
            inputType='file'
            fieldName='mainImageUrl'
            filePath={mainImageUrl}
            accept='image/png image/jpeg image/jpg'
            onChangeHandler={handleChangeMainImage}
          />
          {error && <ErrorContainer error={error} />}
          <div className='button-save-main-info'>
            <YogaStyleButton type='submit'>Save changes</YogaStyleButton>
          </div>
        </form>
      </div>
      
      <div className='additional-information-container'>
        <label className='main-label'>Product's inventory</label>
        <p>
          This section empowers you to customize your product's appearance, stock, 
          and size availability, providing a seamless shopping experience for your customers.
        </p>
        <p>
          You can add different colors for the product and associate images with each color to showcase variations.<br />
          This allows customers to view the product in their preferred 
          color choices, making their shopping experience more personalized and engaging.
        </p>
        <hr className='margin-top-40px' />
        {params.id &&<AddProductColor productId={params.id} />}
        <hr className='margin-top-40px' /> 
        <div className='colors-data-list'>
          <ProductColorsList />
        </div>
      </div>

    </div>
  )
}

export default EditProduct