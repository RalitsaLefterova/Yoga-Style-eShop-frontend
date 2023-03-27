import { Collection } from 'shared/types/collections'

import './collection-item.style.scss'

type CollectionItemType = {
  collectionData: Collection,
  parentCallback: (_id: string) => void
}

const CollectionItem = ({ collectionData, parentCallback }: CollectionItemType) => {
  const { _id: collectionId, title, cover } = collectionData

  const handleGoToPreviewCollection = () => {
    parentCallback(collectionId as string)
  }
  
  return (
    <div className='collection-row' onClick={handleGoToPreviewCollection}>
      <div className='collection-cover'>
        <div 
          className='image-container'
          style={{
            backgroundImage: `url(${process.env.BACKEND_URL}/${cover})`
          }}
        />
      </div>
      <div className='collection-title'>
        {title}
      </div>
    </div>
  )
}

export default CollectionItem