import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSingleCollectionRequested, editCollectionRequested } from 'redux/collections/collections.actions'
import { selectSelectedCollection } from 'redux/collections/collections.selectors'
import { Collection } from 'shared/types/collections'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'

import './edit-collection.style.scss'

const EditCollection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const collection: Collection = useSelector(selectSelectedCollection)
  const { _id: collectionId } = collection
  const [title, setTitle] = useState(collection.title)
  const [cover, setCover] = useState(collection.cover)
  const [newCover, setNewCover] = useState<File>()
  const [active, setActive] = useState(collection.active)

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = (event.target.files as FileList)[0]
      setCover(URL.createObjectURL(file))
      setNewCover(file)
    }
  }

  const handleChangeActive = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked)
  }

  const handleEdit = async (event: FormEvent) => {
    event.preventDefault()
    const data = new FormData()
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

  return (
    <div className='edit-collection-container center'>
      <div className='page-title left'>
        <h1>Edit collection</h1>
      </div>
      <form>
        <CustomInput 
          label='Title'
          type='text'
          field='title'
          value={title}
          onChangeHandler={handleChangeTitle}
        />
        <div>
          <input type='checkbox' checked={active} onChange={handleChangeActive} />
        </div>
        <img src={`${process.env.BACKEND_URL}/${cover}`} alt={`collection ${title}`} />
        <CustomInput 
          label='Collection cover'
          type='file'
          field='cover'
          onChangeHandler={handleChangeCover}
        />
        <CustomButton onClick={handleEdit}>Save</CustomButton>
        <CustomButton onClick={handleCancel}>Cancel</CustomButton>
      </form>
    </div>
  )
}

export default EditCollection