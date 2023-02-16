import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectError } from 'redux/products/products.selectors'
import { addColorToProductRequested } from 'redux/products/products.actions'

import './add-product-color.style.scss'

const AddProductColor = ({ productId }) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const error = useSelector(selectError)

  const handleSetColor = event => {
    setColor(event.target.value)
  }

  const handleSaveColor = async event => {
    event.preventDefault()
    dispatch(addColorToProductRequested(productId, { color: color }))
  }

  return (
    <div>
      <div>Add color</div>
      <form className='add-color-form' onSubmit={handleSaveColor}>
        <div className=''>
          <label htmlFor='color'>Color</label>
          <input
            type='text'
            name='color'
            id='color'
            onChange={handleSetColor}
            value={color}
            placeholder='Write color here...'
            required 
          />
        </div>
        <div>{error}</div>
        <div className=''>
          <button type='submit'>Add color</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductColor