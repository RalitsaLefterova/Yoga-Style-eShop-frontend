import React, { useState } from 'react'

const AddProduct = () => {
  const [productData, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    collectionId: '',
    images: []
  })

  const { title, description, price, collectionId, images } = productData

  const handleSubmit = event => {
    event.preventDefault()
    const formData = {
      "title": title,
      "description": description,
      "price": price,
      "collectionId": collectionId
    }
  }

  <div className='add-product'>
    <div>Add new product</div>
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' />
      <input type='text' name='description' />
      <input type='number' min="0.00" max="10000.00" step="0.01" name='price' />
      <select name='collectionId'>
        <option value='collId1'>collection 1</option>
        <option value='collId2'>collection 2</option>
        <option value='collId3'>collection 3</option>
        <option value='collId4'>collection 4</option>
      </select>
      <button type='submit'>Add product</button>
      <button type='reset'>Clear form</button>
    </form>
  </div>
}

export default AddProduct