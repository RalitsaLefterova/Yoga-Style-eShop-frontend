import { useNavigate, useLocation } from 'react-router-dom'

import { Collection } from '../../shared/types/collections'

import './collection-item.style.scss'

export type CollectionItemPropsType = {
  collection: Collection,
  size: string
}
 
const CollectionItem = ({ collection, size }: CollectionItemPropsType) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, cover } = collection

  
  const collectionTitle = (title as string).replace('and', '&').toUpperCase()
  const navigationCollectionTitle = (title as string).replace(/\s+/g, '-').toLowerCase()
  
  console.log({pathname}, `${pathname}/${navigationCollectionTitle}`)
  
  return (
    <div 
      data-testid="collection-item"
      id='collection-item'
      className={`${size} collection-item`} 
      onClick={() => navigate(`${pathname}/${navigationCollectionTitle}`)}
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