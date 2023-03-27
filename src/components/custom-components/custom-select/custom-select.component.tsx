import { ChangeEventHandler, SelectHTMLAttributes } from 'react'
import { Collection } from 'shared/types/collections.js'

import { ProductColor } from 'shared/types/products.js'
import { generateOptions } from 'shared/helpers'

import './custom-select.style.scss'

type CustomSelectType = {
  data: ProductColor[] | Collection[],
  typeOfData: string,
  placeholder: string,
  label: string,
  selectname: string,
  extraClasses?: string
  handler: ChangeEventHandler<HTMLSelectElement>
} & SelectHTMLAttributes<HTMLSelectElement>

const CustomSelect = ({ typeOfData, data, placeholder, selectname, value = '', handler, label, ...otherProps }: CustomSelectType) => (
  <div className={`flex ${otherProps.extraClasses}`}>
    <label htmlFor={selectname}>{label}</label>
    <div className="selectWrapper">
      <select onChange={handler} name={selectname} id={selectname} defaultValue={value} required>
        <option disabled value=''>{placeholder}</option>
        {generateOptions(typeOfData, data)}
      </select>
    </div>
  </div>  
)

export default CustomSelect