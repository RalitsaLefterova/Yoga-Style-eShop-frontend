import { useNavigate, useLocation } from 'react-router-dom'

import { Collection } from '../../shared/types/collections'

import './collection-item.style.scss'

type CollectionItemType = {
  collection: Collection,
  size: string
}
 
const CollectionItem = ({ collection, size }: CollectionItemType) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, cover } = collection

  const collectionTitle = (title as string).replace('and', '&').toUpperCase()
  const navigationCollectionTitle = (title as string).replace(/\s+/g, '-').toLowerCase()

  return (
    <div 
      className={`${size} collection-item`} 
      onClick={() => navigate(`${pathname}/${navigationCollectionTitle}`)}
    >
      <div 
        className='background-image'
        style={{backgroundImage: `url(${process.env.BACKEND_URL}/uploads/collections/${cover})`}} 
      />
      <div className='content'>
        <h1 className='title'>{collectionTitle}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  )
} 

export default CollectionItem