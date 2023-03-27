import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectError } from 'redux/products/products.selectors'
import { addColorToProductRequested } from 'redux/products/products.actions'

import './add-product-color.style.scss'

type AddProductColorType = {
  productId: string
}

const AddProductColor = ({ productId }: AddProductColorType) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const error = useSelector(selectError)

  const handleSetColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  const handleSaveColor = async (event: FormEvent) => {
    event.preventDefault()
    const data = new FormData()
    color && data.append('color', color)
    dispatch(addColorToProductRequested(productId, data))
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
        {error && <div>{error.message}</div>}
        <div className=''>
          <button type='submit'>Add color</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductColor