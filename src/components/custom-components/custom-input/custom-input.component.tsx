import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { convertDate, humanizeDate } from 'shared/helpers'

import './custom-input.style.scss'

type CustomInputType = {
  inputType: string,
  fieldName: string,
  labelText: string,
  inputValue?: string | number,
  filePath?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

const CustomInput = ({ inputType, fieldName, labelText, inputValue = '', filePath, onChangeHandler, ...otherProps }: CustomInputType) => {

  return (
    <div className="input-container flex">
      <label 
        htmlFor={fieldName}
        className={`form-input-label ${inputValue !== '' ? 'shrink' : ''}`}
      >
        {labelText}
      </label>
      {(inputType === 'file' && filePath) ? (<img src={`${process.env.BACKEND_URL}/${filePath}`} />) : null}
      <input
        className='form-input'
        type={inputType}
        name={fieldName}
        id={fieldName}
        onChange={onChangeHandler}
        value={inputValue} 
        {...otherProps}
        // autoComplete='off'
      />
    </div>
  )
}

export default CustomInput