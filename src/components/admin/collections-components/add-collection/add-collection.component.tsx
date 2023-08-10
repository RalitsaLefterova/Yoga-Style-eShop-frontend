import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { createCollectionRequested } from 'redux/collections/collections.actions'

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ImagePreview from 'components/image-preview/image-preview.component'

import './add-collection.style.scss'

const AddCollection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState<File>()

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const titleValue: string = event.target.value
    setTitle(titleValue)
  }

  const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0]
    setCover(file)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('title', title)
    cover && data.append('cover', cover)
    
    try {
      dispatch(createCollectionRequested(data, navigate))
    } catch (error) {
      console.log('create collection failed', error)
    }
  }

  return (
    <div className='add-collection-container center'>
      <div className='page-title left'>
        <h1>Add new collection</h1>
      </div>
      <div className='add-collection-form-container'>
        <form onSubmit={handleSubmit}>
          <YogaStyleInput 
            fieldName='title'
            labelText='Title'
            inputValue={title}
            onChangeHandler={handleChangeTitle}
          />
          {cover && <ImagePreview image={cover} />}
          <YogaStyleInput
            labelText='Collection cover'
            inputType='file'
            fieldName='cover'
            onChangeHandler={handleChangeCover}
            accept='image/png, image/jpeg, image/jpg'
          />
          <YogaStyleButton type='submit'>Add Collection</YogaStyleButton>
        </form>
      </div>
    </div>
  )
}

export default AddCollection