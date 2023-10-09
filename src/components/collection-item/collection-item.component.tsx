import { useNavigate, useLocation } from 'react-router-dom'

import { Collection } from '../../shared/types/collections'

import './collection-item.style.scss'

export type CollectionItemPropsType = {
  collection: Collection,
  size: 'small' | 'medium' | 'large'
}
 
const CollectionItem = ({ collection, size }: CollectionItemPropsType) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, urlTitle, cover } = collection

  const collectionTitle = (title as string).replace('and', '&').toUpperCase()
  
  const handleOpenCollection = () => {
    navigate(`${pathname}/${urlTitle}`)
  }

  return (
    <div
      className={`${size} collection-item`} 
      onClick={handleOpenCollection}
    >
      <div 
        className='background-image'
        style={{backgroundImage: `url(${process.env.BACKEND_URL}/${cover})`}} 
      />
      <div className='content'>
        <h1 className='title'>{collectionTitle}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  )
} 

export default CollectionItem