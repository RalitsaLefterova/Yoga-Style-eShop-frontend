import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { createProductRequested } from '../../../../redux/products/products.actions'
import { fetchCollectionsShortInfoRequested } from '../../../../redux/collections/collections.actions'
import { selectCollectionsShortInfo } from '../../../../redux/collections/collections.selectors'
// import { checkFormDataEntries } from '../../../components/utils/utils'
import { Collection } from 'shared/types/collections'
import { CreateProduct } from 'shared/types/products'

import YogaStyleInput from '../../../custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleTextEditor from 'components/custom-components/yoga-style-text-editor/yoga-style-text-editor.component'
import YogaStyleSelect from 'components/custom-components/yoga-style-select/yoga-style-select.component'
import CustomButton from '../../../custom-components/custom-button/custom-button.component'

import 'react-quill/dist/quill.snow.css'
import './add-product.style.scss'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const collections: Collection[] = useSelector(selectCollectionsShortInfo)
  const [productData, setProduct] = useState<CreateProduct>({
    title: '',
    description: '',
    mainImageUrl: null,
    price: 0.00,
    stock: 0,
    collectionId: '',
    active: false
  })

  const { title, mainImageUrl, description, price, stock, collectionId, active } = productData

  console.log('description', productData.description)

  const handleSetProductDetails = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name
    const target = event.target as HTMLInputElement
    let value

    switch (name) {
      case 'active':
        target && (value = target.checked)
        break

      case 'mainImageUrl':
        target && target.files && (value = target.files[0])
        break

      default:
        value = target.value
    }

    setProduct({...productData, [name]: value})
  }

  const handleSetProductDescription = (value: string) => {
    console.log('react quill test', value)
    setProduct({...productData, description: value})
  }

  const showImagePreview = () => {
    console.log('productData.mainImageUrl', productData.mainImageUrl)
    console.log('type', typeof(productData.mainImageUrl))
    if (productData.mainImageUrl) {
      const uri = URL.createObjectURL(productData.mainImageUrl)
      return (
        <div className='thumb'>
          <div className='thumb-inner'>
            <img
              src={uri}
              // Revoke data uri after image is loaded
              onLoad={() => { URL.revokeObjectURL(uri) }}
            />
          </div>
        </div>
      )
    }

    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    // checkFormDataEntries(data)
    dispatch(createProductRequested(data, navigate))
  }

  useEffect(() => {
    dispatch(fetchCollectionsShortInfoRequested())
  }, [])
  
  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Add new product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <YogaStyleInput 
          labelText='Title'
          inputType='text'
          fieldName='title'
          inputValue={title}
          onChangeHandler={handleSetProductDetails}
        />

        {productData.mainImageUrl && showImagePreview()}

        <YogaStyleInput 
          labelText='File'
          inputType='file'
          fieldName='mainImageUrl'
          onChangeHandler={handleSetProductDetails}
          accept='image/png image/jpeg image/jpg'
        />

        <YogaStyleTextEditor
          fieldName='description'
          labelText='Description'
          editorValue={description}
          onChange={handleSetProductDescription}
        />
        <div className='flex flex-direction-row'>
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
            inputValue={stock}
            onChangeHandler={handleSetProductDetails}
            min='0'
          />
        </div>
        
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

        <div className="flex">
          <input
            type="checkbox"
            name='active'
            id="active"
            onChange={handleSetProductDetails}
            checked={active}
          />
          <label htmlFor="active">Publish immidiatly after saving</label>
        </div>
        <div className='buttons-container'>
          <CustomButton type='reset' inverted>Clear form</CustomButton>
          <CustomButton type='submit'>Add product</CustomButton>
        </div>
      </form>
    </div>
  )
  
}

export default AddProduct