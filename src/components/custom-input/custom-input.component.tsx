import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import './custom-input.style.scss'

type CustomInputType = {
  type: string,
  field: string,
  value?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput = ({ type, field, value = '', onChangeHandler, ...otherProps }: CustomInputType) => {
  
  return (
    <div className="flex">
      <label htmlFor={field}>{field}</label>
      { type == 'file' && (<img src={value} />) }
      <input
        type={type}
        name={field}
        id={field}
        onChange={onChangeHandler}
        value={value} 
        // accept={type == 'file' ? 'image/png, image/jpeg, image/jpg' : ''}
        {...otherProps}
      />
    </div>
  )
}

export default CustomInput