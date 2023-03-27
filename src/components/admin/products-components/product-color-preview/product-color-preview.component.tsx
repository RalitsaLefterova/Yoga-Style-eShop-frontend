import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import { useState, useCallback, useEffect, FormEvent, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

import { ProductColor } from 'shared/types/products'
import { editProductColorDataRequested, removeOneImageFromColorImagesRequested } from '../../../../redux/products/products.actions'

import './product-color-preview.style.scss'

type ProductColorsPreviewType = {
  productId: string, 
  colorData: ProductColor
}

const ProductColorsPreview = ({ productId, colorData }: ProductColorsPreviewType) => {
  const dispatch = useDispatch()
  const { _id: colorId, color, images, sizes } = colorData
  const [newImages, setNewImages] = useState<File[]>([])

  const handleUploadImages = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    newImages.map(image => formData.append('images', image))
    dispatch(editProductColorDataRequested(productId, colorId, formData))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log({acceptedFiles})
    acceptedFiles.map((file: File) => {
      console.log({file})
      setNewImages( arr => [...arr, file])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const thumbs = newImages.map((image, index) => { 
    const uri = URL.createObjectURL(image)
    return (
      <div 
        key={index} 
        className='thumb' 
        id={index.toString()}
      >
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

  const removeImageFromColorImagesList = (imgUrl: string) => {
    const data = new FormData()
    data.append('imgUrl', imgUrl)
    dispatch(removeOneImageFromColorImagesRequested(productId, colorId, data))
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
        <CustomButton onClick={handleUploadImages}>Upload images</CustomButton>
        <div className='list-of-images'>
          {images.length > 0 && images.map((image, index) => 
            <div
              key={index}
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