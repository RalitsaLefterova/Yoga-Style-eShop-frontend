import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createCollectionRequested } from 'redux/collections/collections.actions'
import { selectError, selectIsLoadingCollections } from 'redux/collections/collections.selectors'

import YogaStyleInput from 'components/custom-components/yoga-style-input/yoga-style-input.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'
import ImagePreview from 'components/image-preview/image-preview.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './add-collection.style.scss'
import YogaStyleTextEditor from 'components/custom-components/yoga-style-text-editor/yoga-style-text-editor.component'

const AddCollection = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState<File>()
  const [collectionTeaser, setCollectionTeaser] = useState('')
  const error = useSelector(selectError)
  const isLoading = useSelector(selectIsLoadingCollections)

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const titleValue: string = event.target.value
    setTitle(titleValue)
  }

  const handleChangeCover = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = (event.target.files as FileList)[0]
    setCover(file)
  }

  const handleChangeCollectionTeaser = (value: string) => {
    setCollectionTeaser(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('title', title)
    cover && data.append('cover', cover)
    collectionTeaser && data.append('collectionTeaser', collectionTeaser)

    dispatch(createCollectionRequested(data, navigate))
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
          <YogaStyleTextEditor 
            fieldName='collectionTeaser'
            labelText='Collection teaser'
            editorValue={collectionTeaser}
            onChange={handleChangeCollectionTeaser}
          />
          {error && <ErrorContainer error={error} />}
          <YogaStyleButton type='submit'>Add Collection</YogaStyleButton>
        </form>
      </div>
    </div>
  )
}

export default AddCollection