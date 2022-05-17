import React, { useState, useEffect } from 'react'

import { getCollectionsShortInfo } from '../../../rest-api/collections'
import CustomSelect from '../../../components/custom-select/custom-select.component'

import './add-product.style.scss'

const AddProduct = () => {
  const [collectionsList, setCollectionsList] = useState([])
  const [productData, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    collection_id: 0,
    images: []
  })
  const [mainImage, setMainImage] = useState()

  const { title, description, price, collectionId, images } = productData

  const handleSetProductDetails = event => {
    setProduct({...productData, [event.target.name]: event.target.value})
  }

  const handleChangeMainImage = event => {
    setMainImage(event.target.files[0])
  }

  const handleSubmit = event => {
    event.preventDefault()
    const formData = {
      "title": title,
      "description": description,
      "price": price,
      "collectionId": collectionId
    }
    console.log(formData)
  }

  const getAllCollectionsShortInfo = () => {
    getCollectionsShortInfo().then(response => {
      console.log(response)
      setCollectionsList(response.data)
    }).catch(e => {
      console.log({e})
    })
  }

  useEffect(() => {
    getAllCollectionsShortInfo()
  }, [])

  return (
    <div className='center'>
      {console.log(productData, mainImage)}
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
            name='cover'
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

        <CustomSelect
          type='collections'
          collections={collectionsList}
          handler={handleSetProductDetails}
          label='Collection'
          // label={`* ${strings.Collection}`}
          placeholder='Select collection'
          selectname='collection_id'
          value={productData.collection_id}
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