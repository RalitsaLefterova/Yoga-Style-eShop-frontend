import './custom-image-container.style.scss'

type CustomImageContainerProps = {
  image: string,
  customClasses?: string
}

const CustomImageContainer = ({ image, customClasses = '' }: CustomImageContainerProps) => {
  return (
    <div 
      className={`background-image ${customClasses}`}
      style={{backgroundImage: `url(${process.env.BACKEND_URL}/${image})`}}
    ></div>
  )
}

export default CustomImageContainer