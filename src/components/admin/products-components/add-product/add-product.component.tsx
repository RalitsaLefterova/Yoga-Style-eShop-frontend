import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { createProductRequested } from '../../../../redux/products/products.actions'
import { fetchCollectionsShortInfoRequested } from '../../../../redux/collections/collections.actions'
import { selectCollectionsShortInfo } from '../../../../redux/collections/collections.selectors'
import { CollectionShortInfo } from 'shared/types/collections'
import { CreateProduct } from 'shared/types/products'
import { selectError } from 'redux/products/products.selectors'
// import { checkFormDataEntries } from '../../../componen ts/utils/utils'

import YogaStyleInput from '../../../custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleTextEditor from 'components/custom-components/yoga-style-text-editor/yoga-style-text-editor.component'
import YogaStyleSelect from 'components/custom-components/yoga-style-select/yoga-style-select.component'
import YogaStyleCheckbox from 'components/custom-components/yoga-style-checkbox/yoga-style-checkbox.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ImagePreview from 'components/image-preview/image-preview.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import 'react-quill/dist/quill.snow.css'
import './add-product.style.scss'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(selectError)
  const collections: CollectionShortInfo[] = useSelector(selectCollectionsShortInfo)
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
    setProduct({...productData, description: value})
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
        {mainImageUrl &&  <ImagePreview image={mainImageUrl} /> }
        <YogaStyleInput 
          labelText='Main Image'
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
        <div className='flex flex-direction-row gap-20'>
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
        <YogaStyleCheckbox
          itemId='active'
          labelText='Make visible on the website immediately upon saving.'
          fieldName='active'
          inputValue={active}
          onChangeHandler={handleSetProductDetails}
          extraClasses='checkbox-container'
        />
        {error && <ErrorContainer error={error} />}
        <div className='buttons-container'>
          <YogaStyleButton type='reset' inverted>Clear form</YogaStyleButton>
          <YogaStyleButton type='submit'>Add product</YogaStyleButton>
        </div>
      </form>
    </div>
  )
  
}

export default AddProduct