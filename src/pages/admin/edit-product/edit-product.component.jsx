import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { editProduct } from '../../../rest-api/products'
import { fetchProductForEditAsync } from '../../../redux/products/products.actions'
import { selectProduct } from '../../../redux/products/products.selectors'
import { selectCollections } from '../../../redux/collections/collections.selectors'

import CustomInput from '../../../components/custom-input/custom-input.component'
import CustomSelect from '../../../components/custom-select/custom-select.component'

import './edit-product.style.scss'

const EditProduct = ({ match, history }) => {
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
    active: false
  })

  const { title, mainImageUrl, description, price, stock, collectionId, active } = productData

  const [newMainImageUrl, setNewMainImageUrl] = useState(null)
  const [isNewMainImageUrlSet, setIsNewMainImageUrlSet] = useState(false)

  const handleSetProductDetails = event => {
    console.log(event.target.name, event.target.value)
    setProductData({
      ...productData,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeMainImage = event => {
    if (event.target.files && event.target.files.length > 0) {
      setProductData({
        ...productData,
        [event.target.name]: URL.createObjectURL(event.target.files[0])
      })
      setNewMainImageUrl(event.target.files[0])
      setIsNewMainImageUrlSet(true)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const productId = match.params.id

    const formData = new FormData()

    const forUpdate = { title, mainImageUrl, description, price, stock, collectionId, active }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      formData.append(key, value)
    })

    isNewMainImageUrlSet && formData.append('mainImageUrl', newMainImageUrl)

    // for(const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    const productResponse = await editProduct(productId, formData)
    console.log({productResponse})
    history.push('/admin/products')
  }

  useEffect(() => {
    dispatch(fetchProductForEditAsync(match.params.id))
  }, [])

  // Set the relation between redux product and local state.
  useEffect(async () => {
    setProductData(product)
  }, [product])

  return (
    <div className='center'> 
      <div>Edit product</div>
      <form onSubmit={handleSubmit}>
        <CustomInput 
          type='text'
          field='title'
          value={title}
          onChangeHandler={handleSetProductDetails}
        />
        <CustomInput 
          type='file'
          field='mainImageUrl'
          value={mainImageUrl}
          accept='image/png image/jpeg image/jpg'
          onChangeHandler={handleChangeMainImage}
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
          collections={collections}
          handler={handleSetProductDetails}
          label='Collection'
          // label={`* ${strings.Collection}`}
          placeholder='Select collection'
          selectname='collectionId'
          value={collectionId}
          extraClasses=''
        ></CustomSelect>
        <button type='submit'>Save changes</button>
      </form>
      {/* {console.log({match})} */}
    </div>
  )
}

export default withRouter(EditProduct)