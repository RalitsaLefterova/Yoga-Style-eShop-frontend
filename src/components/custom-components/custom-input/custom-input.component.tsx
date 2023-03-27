import { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

import './custom-input.style.scss'

type CustomInputType = {
  type: string,
  field: string,
  value?: string | number,
  filePath?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput = ({ type, field, value = '', filePath, onChangeHandler, ...otherProps }: CustomInputType) => {
  return (
    <div className="flex">
      <label htmlFor={field}>{field}</label>
      {(type === 'file' && filePath) ? (<img src={`${process.env.BACKEND_URL}/${filePath}`} />) : null}
      <input
        type={type}
        name={field}
        id={field}
        onChange={onChangeHandler}
        value={value} 
        {...otherProps}
      />
    </div>
  )
}

export default CustomInput