import { useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { Collection } from 'shared/types/collections'
import { editCollectionPositionRequested } from 'redux/collections/collections.actions'

import SortableCollectionItem from '../sortable-collection-item/sortable-collection-item.component'

import './collections-list.style.scss'

type CollectionsListType = {
  collections: Collection[],
  parentCallback: (_id: string) => void
}

const CollectionsList = ({ collections, parentCallback }: CollectionsListType) => {
  const dispatch = useDispatch()
  const [collectionsArray, setCollectionsArray] = useState<Collection[]>([])
  const itemIds: any = useMemo(() => collectionsArray.map((collection) => collection._id), [collectionsArray])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    const collectionId = active.id

    let newPosition = collectionsArray.findIndex(item => item._id === over.id)

    if (newPosition === -1) {
      newPosition = 0 //Special case for moving to the beginning of the list
    } 

    if (active.id !== over.id) {
      const draggedCollection = collectionsArray.find(item => item._id === active.id)
  
      if (draggedCollection) {
        // Update the visual order immediately in the frontend
        setCollectionsArray(items => {
          const newItems = items.filter(item => item._id !== active.id)
          newItems.splice(newPosition, 0, draggedCollection)
          return newItems
        })
  
        // Dispatch the action to update the backend order
        dispatch(editCollectionPositionRequested(collectionId, newPosition));
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    setCollectionsArray(collections)
  }, [collections])

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          {collectionsArray.map((collection: Collection) => {
            const { _id, title, cover } = collection
            if (_id && title && cover) {
            return <SortableCollectionItem 
              key={_id} 
              collectionId={_id}
              title={title} 
              cover={cover}
              parentCallback={parentCallback}
            />
            }
          })}
        </SortableContext>
      </DndContext>
    </>
  )
}

export default CollectionsList