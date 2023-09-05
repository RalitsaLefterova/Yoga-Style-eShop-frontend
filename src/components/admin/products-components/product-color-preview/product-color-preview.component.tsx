import CustomButton from 'components/custom-components/custom-button/custom-button.component'
import { useState, useCallback, useEffect, FormEvent, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons'

import { ProductColor } from 'shared/types/products'
import { deleteColorFromProductRequested, editProductColorDataRequested, removeOneImageFromColorImagesRequested } from '../../../../redux/products/products.actions'

import './product-color-preview.style.scss'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'

type ProductColorsPreviewProps = {
  productId: string, 
  colorData: ProductColor
}

const ProductColorsPreview = ({ productId, colorData }: ProductColorsPreviewProps) => {
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
    dispatch(removeOneImageFromColorImagesRequested(productId, colorId, { imgUrl }))
  }

  const handleDeleteColor = () => {
    dispatch(deleteColorFromProductRequested(productId, colorId))
  }

  useEffect(() => {
    setNewImages([])
  }, [images])

  console.log({newImages})

  return (
    <tr id={colorId} className='color-data-row'>
      <td>
        <div className='color-name-container'>
          {color}
        </div>
      </td>
      <td>
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
        {newImages && newImages.length > 0 && <YogaStyleButton onClick={handleUploadImages}>Upload images</YogaStyleButton>}
      </td>
      <td>
        <div className='sizes-and-stocks-container'>
          sizes here...
        </div>
      </td>
      <td className='delete-color-collumn'>
        <YogaStyleButton
          onClick={handleDeleteColor}
          extraClasses='delete-color-btn'
        >
          <span>Delete color <FontAwesomeIcon icon={faTrash} /></span>
        </YogaStyleButton>
      </td>
    </tr>
  )
}

export default ProductColorsPreview