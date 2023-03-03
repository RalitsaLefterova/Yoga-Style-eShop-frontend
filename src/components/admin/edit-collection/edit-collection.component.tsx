import { ChangeEvent, FormEvent, useState } from 'react'

import { editCollection } from '../../../rest-api/collections'
import { Collection } from '../../../shared/types/collections'

import CustomInput from 'components/custom-input/custom-input.component'
import CustomButton from 'components/custom-button/custom-button.component'

import './edit-collection.style.scss'

type editCollectionType = {
  collection: Collection,
  parentCallbackBackToPreview: (showPreview: boolean) => void
}

const EditCollection = ({ collection, parentCallbackBackToPreview }: editCollectionType) => {
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

  const handleEdit = (event: FormEvent) => {
    event.preventDefault()

    const collectionId = collection._id
    const data = new FormData()

    data.append('title', title)
    newCover && data.append('cover', newCover)
    data.append('active', JSON.stringify(active))
    
    editCollection(collectionId, data).then(response => {
      console.log(response)
    }).catch(e => console.log(e))
    
    parentCallbackBackToPreview(true)
  }

  const handleCancel = () => {
    parentCallbackBackToPreview(true)
  }

  return  (
    <div>
      <form>
        <CustomInput 
          type='text'
          field='title'
          value={title}
          onChangeHandler={handleChangeTitle}
        />

        <div>
          <input type='checkbox' checked={active} onChange={handleChangeActive} />
        </div>
        <img src={cover} alt='collection-cover' />
        <CustomInput 
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