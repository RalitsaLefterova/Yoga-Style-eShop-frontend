import { Feature } from 'shared/types/feature'

import './feature.style.scss'

type FeatureProps = {
  feature: Feature
}

const Feature = ({ feature }: FeatureProps) => {
  const { title, image, content } = feature
  return (
    <div className='feature-box'>
        <div className='feature-image-box'>
          <img src={image} />
        </div>
        <div className='feature-text-box'>
          <h3>{title}</h3>
          <span>
            {content}
          </span>
        </div>
      </div>
  )
}

export default Feature