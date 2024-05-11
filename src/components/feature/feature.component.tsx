import { FeatureType } from 'shared/types/feature'

import './feature.style.scss'

type FeatureProps = {
  featureProps: FeatureType
}

const Feature = ({ featureProps }: FeatureProps) => {
  const { title, image, content } = featureProps
  return (
    <article className='feature-box'>
        <div className='feature-image-box'>
          <img src={image} />
        </div>
        <div className='feature-text-box'>
          <h3>{title}</h3>
          <span>
            {content}
          </span>
        </div>
      </article>
  )
}

export default Feature