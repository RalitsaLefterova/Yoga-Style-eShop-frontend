import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCollectionsShortInfoAsync } from '../../../redux/collections/collections.actions'
import { selectCollectionsShortInfo } from '../../../redux/collections/collections.selectors'

import CustomSelect from '../../../components/custom-select/custom-select.component'
import { createProduct } from '../../../rest-api/products'

import './add-product.style.scss'

const AddProduct = () => {
  const dispatch = useDispatch()
  const collections = useSelector(selectCollectionsShortInfo)
  const [mainImageUrl, setMainImage] = useState()
  const [productData, setProduct] = useState({
    title: '',
    description: '',
    mainImageUrl: '',
    price: 0.00,
    stock: 0,
    collectionId: 0,
    active: false
  })

  const { title, description, price, collectionId, stock, active } = productData

  const handleSetProductDetails = event => {
    setProduct({...productData, [event.target.name]: event.target.value})
  }

  const handleChangeMainImage = event => {
    setMainImage(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const data = new FormData()

    const forUpdate = { title, mainImageUrl, description, price, stock, collectionId, active }

    Object.entries(forUpdate).forEach(entry => {
      const [key, value] = entry
      formData.append(key, value)
    })
    // for(const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    const productResponse = await createProduct(data)
    console.log({productResponse})
  }

  useEffect(() => {
    dispatch(fetchCollectionsShortInfoAsync())
  }, [])

  return (
    <div className='center'>
      {console.log(productData, mainImageUrl)}
      <div>Add new product</div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name='title'
            id="title"
            onChange={handleSetProductDetails}
            value={title}
          />
        </div>
        <div className="flex">
          <label htmlFor="file">File</label>
          <input
            type="file"
            name='mainImageUrl'
            id="file"
            onChange={handleChangeMainImage} 
            accept='image/png image/jpeg image/jpg'
          />
        </div>
        <div className="flex">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name='description'
            id="description"
            onChange={handleSetProductDetails}
            value={description}
          />
        </div>
        <div className="flex">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            min="0.00" 
            max="10000.00" 
            step="0.01" 
            name='price'
            id="price"
            onChange={handleSetProductDetails}
            value={price}
          />
        </div>
        <div className="flex">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name='stock'
            id="stock"
            onChange={handleSetProductDetails}
            value={stock}
          />
        </div>
        <div className="flex">
          <label htmlFor="active">Publish immidiatly after saving</label>
          <input
            type="checkbox"
            name='active'
            id="active"
            onChange={handleSetProductDetails}
            checked={active}
          />
        </div>

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
        {/* <select 
          name='collectionId' 
          id='collectionId' 
          onChange={handleSetCollectionId}
          className='select-collection capitalize-first'
        >
          <option>Choose collection</option>
          {collectionsList.map(collection => 
            <option 
              value={collection._id} 
              key={collection._id}
              className='capitalize-first'
            >
              {collection.title}
            </option>
          )}
        </select> */}
        <button type='submit'>Add product</button>
        <button type='reset'>Clear form</button>
      </form>
    </div>
  )
  
}

export default AddProduct