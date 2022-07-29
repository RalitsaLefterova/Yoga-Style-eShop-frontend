import React from 'react'

export const regExEmail = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regExPhone = () => /^(?=.*[0-9])[- +()0-9]+$/;

export const generateOptions = (types, data) => {

  switch (types) {

    case 'collections':
      return (data || []).map(collection => (
        <option key={collection._id} value={collection._id}>{collection.title}</option>
      ))

    case 'language':
    case 'currency':
      return data.map((property, index) => (
          <option key={index} value={property}>{property}</option>
        ))

    default:
  }
}

export const convertDate = date => {
  let newDate = new Date(date),
      day = newDate.getDate(),
      month = newDate.getMonth() + 1,
      year = newDate.getFullYear()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export const inputDate = option => {
  let currentDate = new Date(),
      day = currentDate.getDate(),
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear()

  switch(option) {
    case 'min':
      return `${(year - 100)}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    case 'max':
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  }
}

export const isNotEmptyObject = obj => {
  console.log(Object.keys(obj).length)
  return Object.keys(obj).length != 0
}

export const checkFormDataEntries = formData => {
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
}


export const extractChangedValues = obj => {
  let dataObj = {}

  Object.entries(obj).forEach(([key, data]) => {
    data.isChanged && (dataObj[key] = data.value)
  })
  
  return dataObj
}