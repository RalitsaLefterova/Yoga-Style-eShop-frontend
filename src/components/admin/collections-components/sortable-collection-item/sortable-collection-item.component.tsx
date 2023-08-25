import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import './sortable-collection-item.style.scss'

type SortableCollectionItemType = {
  collectionId: string, 
  title: string, 
  cover: string,
  parentCallback: (_id: string) => void
}

const SortableCollectionItem = ({ collectionId, title, cover, parentCallback }: SortableCollectionItemType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: collectionId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleGoToPreviewCollection = () => {
    parentCallback(collectionId)
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className='collection-row' 
      onClick={handleGoToPreviewCollection}
    >
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
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    //   <div>{title}</div>
    // </div>
  )
}

export default SortableCollectionItem