import './image-preview.style.scss'

type ImagePreviewProps = {
  image: File | string,
  alt?: string
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  console.log('image', image)
  console.log('type', typeof(image))

  const imageHTML = () => {
    if (typeof image === 'string') {
      return <img src={`${process.env.BACKEND_URL}/${image}`}/>
    } else if (image instanceof File) {
      const uri = URL.createObjectURL(image as File)
      return <img
                src={uri}
                // Revoke data uri after image is loaded
                onLoad={() => { URL.revokeObjectURL(uri) }}
              />
    } else {
      // TODO: Maybe use placeholder image?
      return null // This line ensures a valid return value
    }
  }

  return (
    <div className="thumb">
      <div className="thumb-inner">
        {imageHTML()}
      </div>
    </div>
  )
}

export default ImagePreview