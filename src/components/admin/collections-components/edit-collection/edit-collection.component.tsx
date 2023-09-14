import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSingleCollectionRequested, editCollectionRequested } from 'redux/collections/collections.actions'
import { selectError, selectSelectedCollection } from 'redux/collections/collections.selectors'
import { Collection } from 'shared/types/collections'

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import YogaStyleCheckbox from 'components/custom-components/yoga-style-checkbox/yoga-style-checkbox.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './edit-collection.style.scss'

const EditCollection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const collection: Collection = useSelector(selectSelectedCollection)
  const [collectionData, setCollectionData] = useState(collection)
  const [newCover, setNewCover] = useState<File>()
  const error = useSelector(selectError)
  const [errorOnMissingProperty, setErrorOnMissingProperty] = useState('')

  const {
    _id: collectionId = '',
    title,
    urlTitle,
    cover,
    active = false
  }: Collection = collectionData

  const handleSetCollectionData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target as HTMLInputElement
    const newValue = (name === 'active') ? checked : value
    
    setCollectionData((prevCollectionData) => ({
      ...prevCollectionData, 
      [name]: newValue
    }))
  }

  const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0]

    setCollectionData((prevCollectionData) => ({
      ...prevCollectionData,
      [event.target.name]: file
    }))
    setNewCover(file)
  }

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault()
    const data = new FormData()

    if (!title) {
      setErrorOnMissingProperty('Missing collection title')
      return
    } 

    title && data.append('title', title)
    newCover && data.append('cover', newCover)
    data.append('active', JSON.stringify(active))

    collectionId && dispatch(editCollectionRequested(collectionId, data, navigate))
  }

  const handleCancel = () => {
    navigate('/admin/collections')
  }
  
  useEffect(() => {
    dispatch(fetchSingleCollectionRequested(params.id as string))
  }, [])

  // Set the relation between redux collection and local state.
  useEffect(() => {
    setCollectionData(collection)
  }, [collection])

  return (
    <div className='edit-collection-container center'>
      <div className='page-title left'>
        <h1>Edit collection</h1>
      </div>
      <form className='edit-collection-form-container'>
        <div className='left'>
          <YogaStyleCheckbox
            itemId={collectionId}
            labelText='Active'
            fieldName='active'
            inputValue={active}
            onChangeHandler={handleSetCollectionData}
          />
          <span className='checkbox-description'>
            (This checkbox serves as a visibility toggle for collections. 
            When marked as "Active," the collection becomes accessible to 
            users using the online shop. On the other hand, if 
            the collection is inactive, it remains hidden from view.)
          </span>
        </div>
        <YogaStyleInput 
          labelText='Title'
          fieldName='title'
          inputValue={title}
          onChangeHandler={handleSetCollectionData}
        />
        <YogaStyleInput 
          labelText='Collection cover'
          inputType='file'
          fieldName='cover'
          filePath={cover}
          accept='image/png image/jpeg image/jpg'
          onChangeHandler={handleChangeCover}
        />
        {(error || errorOnMissingProperty) && <ErrorContainer error={error} customTextMessage={errorOnMissingProperty} />}
        <div className='buttons-container'>
          <YogaStyleButton 
            onClick={handleEdit} 
            extraClasses='edit-collection-button'
          >
            Save
          </YogaStyleButton>
          <YogaStyleButton 
            onClick={handleCancel} 
            inverted 
            extraClasses='cancel-edit-collection-button'
          >
            Cancel
          </YogaStyleButton>
        </div>
      </form>
    </div>
  )
}

export default EditCollection