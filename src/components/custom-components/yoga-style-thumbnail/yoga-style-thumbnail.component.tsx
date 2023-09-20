import './yoga-style-thumbnail.style.scss'

type YogaStyleThumbnailProps = {
  image: string,
  customClasses?: string,
  alt?: string
}

const YogaStyleThumbnail = ({ image, customClasses = '', alt = '' }: YogaStyleThumbnailProps) => {
  return (
    <div 
      className={`background-image ${customClasses}`}
      style={{backgroundImage: `url(${process.env.BACKEND_URL}/${image})`}}
    ></div>
  )
}

export default YogaStyleThumbnail