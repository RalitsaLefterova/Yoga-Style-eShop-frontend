import { ChangeEventHandler, SelectHTMLAttributes } from 'react'
import { Collection } from 'shared/types/collections.js'

import { ProductColor } from 'shared/types/products.js'
import { generateOptions } from 'shared/helpers'

import './custom-select.style.scss'

type CustomSelectType = {
  data: ProductColor[] | Collection[] | string[],
  typeOfData: string,
  placeholder: string,
  labelText: string,
  selectname: string,
  extraClasses?: string
  handler: ChangeEventHandler<HTMLSelectElement>
} & SelectHTMLAttributes<HTMLSelectElement>

const CustomSelect = ({ typeOfData, data, placeholder, selectname, value = '', handler, labelText, ...otherProps }: CustomSelectType) => (
  <div className={`flex ${otherProps.extraClasses}`}>
    <label htmlFor={selectname}>{labelText}</label>
    <div className="selectWrapper">
      <select 
        onChange={handler} 
        name={selectname} 
        id={selectname} 
        value={value}
        required
      >
        <option disabled value=''>{placeholder}</option>
        {generateOptions(typeOfData, data)}
      </select>
    </div>
  </div>  
)

export default CustomSelect