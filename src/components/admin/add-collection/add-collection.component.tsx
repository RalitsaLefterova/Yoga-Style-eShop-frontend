import { ChangeEvent, useState } from 'react'

import { createCollection } from '../../../rest-api/collections'

import CustomInput from 'components/custom-input/custom-input.component'
import CustomButton from 'components/custom-button/custom-button.component'

import './add-collection.style.scss'

type parentCallbackType = {
  parentCallback: (isAdded: boolean) => void
}

const AddCollection = ({ parentCallback }: parentCallbackType) => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = new FormData()
    data.append('title', title)
    cover && data.append('cover', cover)
    
    // const collectionResponse = await createCollection(data)
    await createCollection(data)
    parentCallback(true)
  }

  return (
    <div className='add-collection'>
      <div>Add new collection</div>
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
        />
        <CustomButton buttonType='submit'>Add Collection</CustomButton>
      </form>
    </div>
  )
}

export default AddCollection