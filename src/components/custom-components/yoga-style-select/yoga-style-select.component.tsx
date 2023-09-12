import { ChangeEventHandler, SelectHTMLAttributes } from 'react'
import { Collection } from 'shared/types/collections.js'

import { ProductColor } from 'shared/types/products.js'
import { generateOptions } from 'shared/helpers'

import './yoga-style-select.style.scss'

type YogaStyleSelectProps = {
  data: ProductColor[] | Collection[] | string[],
  typeOfData: string,
  placeholder: string,
  labelText: string,
  selectName: string,
  extraClasses?: string,
  value: string,
  handler: ChangeEventHandler<HTMLSelectElement>
} & SelectHTMLAttributes<HTMLSelectElement>

const YogaStyleSelect = ({ typeOfData, data, placeholder, selectName, value = '', handler, labelText, ...otherProps }: YogaStyleSelectProps) => (
  <div className={`yoga-style-select-container ${otherProps.extraClasses}`}>
    <label 
      htmlFor={selectName}
      className='yoga-style-label'
    >
      {labelText}
    </label>
    <div className="selectWrapper">
      <select 
        className='yoga-style-select-box'
        name={selectName} 
        id={selectName} 
        value={value}
        required
        onChange={handler} 
      >
        <option disabled value='' className='select-placeholder'>{placeholder}</option>
        {generateOptions(typeOfData, data)}
      </select>
    </div>
  </div>  
)

export default YogaStyleSelect