import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

import { editProductColorDataRequested, removeOneImageFromColorImagesRequested } from '../../../redux/products/products.actions'

import './product-color-preview.style.scss'

const ProductColorsPreview = ({ productId, colorData }) => {
  const dispatch = useDispatch()
  const { _id: colorId, color, images, sizes } = colorData
  const [newImages, setNewImages] = useState([])

  const handleUploadImages = async event => {
    event.preventDefault()
    const formData = new FormData()
    newImages.map(image => formData.append('images', image))
    dispatch(editProductColorDataRequested(productId, colorId, formData))
  }

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.map(file => {
      console.log({file})
      setNewImages( arr => [...arr, file])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const thumbs = newImages.map((image, index) => { 
    const uri = URL.createObjectURL(image)
    return (
      <div className='thumb' key={index} id={index}>
        <div className='thumb-inner'>
          <img
            src={uri}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(uri) }}
          />
        </div>
      </div>
      )
    })

  const removeImageFromColorImagesList = imgUrl => {
    dispatch(removeOneImageFromColorImagesRequested(productId, colorId, {imgUrl}))
  }

  useEffect(() => {
    setNewImages([])
  }, [images])

  return (
    <tr id={colorId} className='color-data-row'>
      <td>
        <div className='color-name-container'>
          {color}
        </div>
      </td>
      <td>
        <div className='dropzone-container' {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop files here, or click to select files</p>
          }
        </div>
        <aside className='thumbs-container'>
          {thumbs}
        </aside>
        <div className=''>
          <button onClick={handleUploadImages}>Upload images</button>
        </div>
        <div className='list-of-images'>
          {images.length > 0 && images.map(image => 
            <div
              className='image-box' 
              style={{ backgroundImage: `url(${process.env.BACKEND_URL}/${image})`}} 
            >
              <span className='delete-image-btn' onClick={() => removeImageFromColorImagesList(image)}>x</span>
            </div>
          )}
        </div>
      </td>
      <td>
        <div className='sizes-and-stocks-container'>
          sizes here...
        </div>
      </td>
    </tr>
  )
}

export default ProductColorsPreview