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

import SortableItem from 'components/sortable-item/sortable-item.component'
// import SingleCollection from '../single-collection/single-collection.component'

type CollectionsListType = {
  collections: Collection[],
  parentCallback: (_id: string) => void
}

const CollectionsList = ({ collections, parentCallback }: CollectionsListType) => {
  const dispatch = useDispatch()
  // const reducedArray = collections.reduce(
  //   (accumulator, collection) => 
  //     accumulator.concat({ id: collection._id, title: collection.title }), 
  //   [])

  const [collectionsArray, setCollectionsArray] = useState<Collection[]>([])
  const itemIds: any = useMemo(() => collectionsArray.map((collection) => collection._id), [collectionsArray]);
  console.log({collectionsArray}, {itemIds})

  const handleDragEnd = (event: any) => {
    // console.log({event})
    const { active, over } = event
    const collectionId = active.id
    const position = collectionsArray.findIndex((collection, index) => {
      console.log({collection}, {index})
      if (collection._id === over.id) {
        return index
      }
    })
    console.log({position}, typeof(position))
    // const position = 
    // console.log({active}, {over})
    if (active.id !== over.id) {
      setCollectionsArray(items => {
        console.log({items})
        const oldIndex = items.findIndex((item) => item._id === active.id)
        const newIndex = items.findIndex((item) => item._id === over.id) 
        console.log({oldIndex}, {newIndex})
        console.log(arrayMove(items, oldIndex, newIndex))
        
        return arrayMove(items, oldIndex, newIndex)
      })
      dispatch(editCollectionPositionRequested(collectionId, position))
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
            return <SortableItem 
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