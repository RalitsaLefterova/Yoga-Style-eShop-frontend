import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import './custom-input.style.scss'

type CustomInputType = {
  type: string,
  field: string,
  label: string,
  value?: string | number | Date,
  filePath?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput = ({ type, field, label, value = '', filePath, onChangeHandler, ...otherProps }: CustomInputType) => {
  return (
    <div className="input-container flex">
      <label 
        htmlFor={field}
        className={`form-input-label ${value !== '' ? 'shrink' : ''}`}
      >
        {label}
      </label>
      {(type === 'file' && filePath) ? (<img src={`${process.env.BACKEND_URL}/${filePath}`} />) : null}
      <input
        className='form-input'
        type={type}
        name={field}
        id={field}
        onChange={onChangeHandler}
        value={value} 
        {...otherProps}
        // autoComplete='off'
      />
    </div>
  )
}

export default CustomInput