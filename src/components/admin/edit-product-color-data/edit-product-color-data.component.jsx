import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'

import { addColorToProductRequested } from 'redux/products/products.actions'
import { selectError } from 'redux/products/products.selectors'

import CustomInput from 'components/custom-input/custom-input.component'

import './edit-product-color-data.style.scss'

const EditProductColorData = ({ productId }) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const [images, setImages] = useState([])
  const error = useSelector(selectError)

  const handleSetColor = event => {
    setColor(event.target.value)
  }

  const handleSaveColorData = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('color', color)
    images.map(image => formData.append('images', image))
    dispatch(addColorToProductRequested(productId, formData))
  }

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   console.log({acceptedFiles})
  //   acceptedFiles.map(file => {
  //     console.log(file)
  //     setImages( arr => [...arr, file])
  //   })
  // }, [])

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // console.log({getRootProps}, {getInputProps}, {isDragActive})

  
  
  return (
    <div>
      <div>Add color and images to product</div>
      <form className='add-color-data-form' onSubmit={handleSaveColorData}>
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
        <div className=''>
          {/* <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop files here, or click to select files</p>
            }
          </div> */}
        </div>
        <div>{error}</div>
        <div className=''>
          <button type='submit'>Add to product inventory</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductColorData