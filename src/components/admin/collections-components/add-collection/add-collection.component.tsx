import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { createCollectionRequested } from 'redux/collections/collections.actions'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomButton from 'components/custom-components/custom-button/custom-button.component'

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
    console.log('type of the "file"', typeof(file), file)
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
      <form onSubmit={handleSubmit}>
        <CustomInput 
          type='text'
          field='title'
          value={title}
          onChangeHandler={handleChangeTitle}
        />
        <CustomInput 
          type='file'
          field='cover'
          onChangeHandler={handleChangeCover}
          accept='image/png, image/jpeg, image/jpg'
        />
        <CustomButton type='submit'>Add Collection</CustomButton>
      </form>
    </div>
  )
}

export default AddCollection