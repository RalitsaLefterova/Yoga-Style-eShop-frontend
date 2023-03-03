import { ChangeEventHandler } from 'react'

import './custom-input.style.scss'

type CustomInputType = {
  type: string,
  field: string,
  value?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
}

const CustomInput = ({ type, field, value = '', onChangeHandler }: CustomInputType) => {
  
  return (
    <div className="flex">
      <label htmlFor={field}>{field}</label>
      { type == 'file' && (<img src={value} alt='collection-cover' />) }
      <input
        type={type}
        name={field}
        id={field}
        onChange={onChangeHandler}
        value={type == 'file' ? '' : value} 
        accept={type == 'file' ? 'image/png, image/jpeg, image/jpg' : ''}
      />
    </div>
  )
}

export default CustomInput