import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { getSingleProduct, editProduct } from '../../../rest-api/products'
import { getCollectionsShortInfo } from '../../../rest-api/collections'

import CustomInput from '../../../components/custom-input/custom-input.component'
import CustomSelect from '../../../components/custom-select/custom-select.component'

import './edit-product.style.scss'

const EditProduct = ({ match, history }) => {
  const [data, setData] = useState({
    collectionsList: [],
    productData: {
      title: '',
      mainImageUrl: '',
      description: '',
      price: 0,
      stock: 0,
      collectionId: 0,
      images: []
    }
  })

  const [newMainImageUrl, setNewMainImageUrl] = useState(null)
  const [isNewMainImageUrlSet, setIsNewMainImageUrlSet] = useState(false)

  const handleSetProductDetails = e => {
    console.log(e.target.name, e.target.value)
    setData({
      ...data,
      productData: {
        ...data.productData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleChangeMainImage = e => {
    if (e.target.files && e.target.files.length > 0) {
      setData({
        ...data,
        productData: {
          ...data.productData,
          [e.target.name]: URL.createObjectURL(e.target.files[0])
        }
      })
      setNewMainImageUrl(e.target.files[0])
      setIsNewMainImageUrlSet(true)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const productId = match.params.id

    const formData = new FormData()
    formData.append('title', data.productData.title)
    formData.append('description', data.productData.description)
    formData.append('price', data.productData.price)
    formData.append('stock', data.productData.stock)
    formData.append('collectionId', data.productData.collectionId)

    if (isNewMainImageUrlSet) {
      formData.append('mainImageUrl', newMainImageUrl)
    }

    console.log(formData)
    const productResponse = await editProduct(productId, formData)
    console.log({productResponse})
    history.push('/admin/products')
  }

  useEffect(() => {
    const fetchData = async () => {
      const productDetails = await getSingleProduct(match.params.id)
      const allCollections = await getCollectionsShortInfo()
      setData({collectionsList: allCollections.data, productData: productDetails.data})
    }
    fetchData()
  }, [])

  return (
    <div className='center'> 
      <div>Edit product</div>
      <form onSubmit={handleSubmit}>
        <CustomInput 
          type='text'
          field='title'
          value={data.productData.title}
          onChangeHandler={handleSetProductDetails}
        />
        <CustomInput 
          type='file'
          field='mainImageUrl'
          value={data.productData.mainImageUrl}
          accept='image/png image/jpeg image/jpg'
          onChangeHandler={handleChangeMainImage}
        />
        <CustomInput 
          type='text'
          field='price'
          value={data.productData.price}
          onChangeHandler={handleSetProductDetails}
        />
        <CustomInput 
          type='text'
          field='description'
          value={data.productData.description}
          onChangeHandler={handleSetProductDetails}
        />
        <CustomInput 
          type='text'
          field='stock'
          value={data.productData.stock || 0}
          onChangeHandler={handleSetProductDetails}
        />
        <CustomSelect
          type='collections'
          collections={data.collectionsList}
          handler={handleSetProductDetails}
          label='Collection'
          // label={`* ${strings.Collection}`}
          placeholder='Select collection'
          selectname='collectionId'
          value={data.productData.collectionId}
          extraClasses=''
        ></CustomSelect>
        <button type='submit'>Save changes</button>
      </form>
      {console.log({match})}
    </div>
  )
}

export default withRouter(EditProduct)