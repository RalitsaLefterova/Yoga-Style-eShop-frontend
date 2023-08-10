import './image-preview.style.scss'

type ImagePreviewProps = {
  image: File
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  console.log('image', image)
  console.log('type', typeof(image))
  if (image) {
    const uri = URL.createObjectURL(image)
    return (
      <div className='thumb'>
        <div className='thumb-inner'>
          <img
            src={uri}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(uri) }}
          />
        </div>
      </div>
    )
  }

  return null
}

export default ImagePreview