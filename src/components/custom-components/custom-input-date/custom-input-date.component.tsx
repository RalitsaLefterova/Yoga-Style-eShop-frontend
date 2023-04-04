import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import { convertDate } from 'shared/helpers'

import './custom-input-date.style.scss'

type CustomInputDateProps = {
  fieldName: string,
  labelText: string,
  dateValue?: string | Date,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

const CustomInputDate = ({fieldName, labelText, dateValue = '', onChangeHandler, ...otherProps}: CustomInputDateProps) => {
  return (
    <div className='input-container flex'>
      <label 
        htmlFor={fieldName}
        className={`form-input-label ${dateValue !== '' ? 'shrink' : ''}`}
      >
        {labelText}
      </label>
      <input
        className={`form-input ${!dateValue ? 'transparent-date-placeholder' : ''}`} 
        type='date'
        name={fieldName}
        id={fieldName}
        onChange={onChangeHandler}
        value={convertDate(dateValue)}
        {...otherProps}
      />
    </div>
  )
}

export default CustomInputDate