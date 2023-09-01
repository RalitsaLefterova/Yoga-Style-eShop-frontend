import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectErrorOnAddColor } from 'redux/products/products.selectors'
import { addColorToProductRequested } from 'redux/products/products.actions'

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './add-product-color.style.scss'

type AddProductColorProps = {
  productId: string
}

const AddProductColor = ({ productId }: AddProductColorProps) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const error = useSelector(selectErrorOnAddColor)

  const handleSetColor = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value)
  }

  const handleSaveColor = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(addColorToProductRequested(productId, { color }))
  }
  console.log('in AddProductColor', color)
  return (
    <form className='add-color-form' onSubmit={handleSaveColor}>
      <div className='left'>
        <p>
          You can add different colors for the product and associate images with each color to showcase variations.<br />
          This allows customers to view the product in their preferred 
          color choices, making their shopping experience more personalized and engaging.
        </p>
        <YogaStyleInput 
          fieldName='color'
          itemID='color'
          labelText='Add color'
          placeholder='Write the name of the color here...'
          inputValue={color}
          onChangeHandler={handleSetColor}
          required
        />
        {error && <ErrorContainer error={error} />}
        <YogaStyleButton type='submit'>Save Color</YogaStyleButton>
      </div>
    </form>
  )
}

export default AddProductColor