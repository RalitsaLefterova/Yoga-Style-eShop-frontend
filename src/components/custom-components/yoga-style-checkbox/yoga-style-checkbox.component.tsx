import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import './yoga-style-checkbox.style.scss'

type YogaStyleCheckboxProps = {
  itemId: string,
  fieldName: string,
  labelText: string,
  inputValue: boolean,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>,
  extraClasses?: string
} & InputHTMLAttributes<HTMLInputElement>

const YogaStyleCheckbox = ({ itemId, fieldName, labelText, inputValue = false, onChangeHandler}: YogaStyleCheckboxProps) => {
  return (
    <div className='yoga-style-checkbox-container'>
      <input
        className='yoga-style-checkbox-input'
        id={itemId}
        type='checkbox' 
        name={fieldName}
        checked={inputValue} 
        onChange={onChangeHandler}
      /> 
      <label htmlFor={itemId} >
        {labelText}
      </label>
    </div>
  )
}

export default YogaStyleCheckbox