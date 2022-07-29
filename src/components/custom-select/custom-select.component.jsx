import React from 'react'

import { generateOptions } from '../utils/utils.jsx'

import './custom-select.style.scss'

const CustomSelect = ({ type, data, placeholder, selectname, value, handler, label, ...otherProps }) => (
  <div className={`flex ${otherProps.extraClasses}`}>
    <label htmlFor={selectname}>{label}</label>
    <div className="selectWrapper">
      <select onChange={handler} name={selectname} id={selectname} value={value} required>
        <option disabled="disabled" value="0">{placeholder}</option>
        {generateOptions(type, data)}
      </select>
    </div>
  </div>
  // <div className="select-box">
  //   <div className="select-box__current" tabIndex="1">
  //     {collections.map((index, collection) => {
  //       <div className="select-box__value">
  //         <input className="select-box__input" type="radio" id={index} value={collection._id} name="selectname" />
  //         <p className="select-box__input-text">{collection.title}</p>
  //       </div>
  //     })}
  //     <img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
  //   </div>
  //   <ul className="select-box__list">
  //     {collections.map((index, collection) => {
  //       <li>
  //         <label className="select-box__option" htmlFor={index} aria-hidden="aria-hidden">{collection.title}</label>
  //       </li>
  //     })}
  //   </ul>
  // </div>    
)

export default CustomSelect