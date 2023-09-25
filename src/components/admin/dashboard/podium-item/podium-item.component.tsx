import { Product } from 'shared/types/products'

import YogaStyleThumbnail from 'components/custom-components/yoga-style-thumbnail/yoga-style-thumbnail.component'

import './podium-item.style.scss'

type PodiumItemProps = {
  place: string
  color: string
  product: Product
}

const PodiumItem = ({ place, color, product }: PodiumItemProps) => (
  <div className={`place ${place}`}>
    <div className='image-box'>
      <YogaStyleThumbnail image={product.mainImageUrl} />
    </div>
    <div className={`top ${color}-box`} />
    <div className='base'>
      <span>{product.title}</span>
    </div>
  </div>
)

export default PodiumItem