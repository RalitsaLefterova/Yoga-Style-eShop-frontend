import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import './yoga-style-input.style.scss'

type YogaStyleInputProps = {
  inputType?: string,
  fieldName: string,
  labelText: string,
  inputValue?: string | number,
  filePath?: string,
  onChangeHandler: ChangeEventHandler<HTMLInputElement>
  extraClasses?: string,
} & InputHTMLAttributes<HTMLInputElement>

const YogaStyleInput = ({ inputType = 'text', fieldName, labelText, inputValue = '', filePath, onChangeHandler, extraClasses = '', ...otherProps }: YogaStyleInputProps) => {

  return (
    <div className={`yoga-style-input-container ${extraClasses}`}>
      <label 
        htmlFor={fieldName}
        className='yoga-style-label'
      >
        {labelText}
      </label>
      {(inputType === 'file' && filePath) ? (<img src={`${process.env.BACKEND_URL}/${filePath}`} />) : null}
       
      {(inputType === 'file') ? 
        (
          <label className="file">
            <input 
              id={fieldName}
              type={inputType}
              name={fieldName}
              onChange={onChangeHandler}
              {...otherProps}
            />
            <span className="file-custom"></span>
          </label>
        ) 
        : 
        (
          <input 
            id={fieldName}
            className='yoga-style-input'
            type={inputType}
            name={fieldName}
            onChange={onChangeHandler}
            value={inputValue} 
            {...otherProps}
          />
        )
      }
    </div>
  )
}

export default YogaStyleInput