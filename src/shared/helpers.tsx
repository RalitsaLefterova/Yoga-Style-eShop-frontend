import React from 'react'
import { GenericObject} from './types/common';
import { Collection } from './types/collections';
import { ProductColor } from './types/products';

export const regExEmail = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regExPhone = () => /^(?=.*[0-9])[- +()0-9]+$/;

export const generateOptions = (type: string, data: Collection[] | ProductColor[] | string[]) => {

  switch (type) {

    case 'collections':
      return (data as Collection[] || []).map((collection: Collection) => (
        <option key={collection._id} value={collection._id}>{collection.title}</option>
      ))

    case 'colors':
      return (data as ProductColor[] || []).map((color: ProductColor) => (
        <option key={color._id} value={color._id}>{color.color}</option>
      ))

    case 'language':
    case 'currency':
      return (data as string[] || []).map((property: string, index: number) => (
          <option key={index} value={property}>{property}</option>
        ))

    default:
  }
}

export const convertDate = (date: string | Date) => {
  const newDate = new Date(date),
      day = newDate.getDate(),
      month = newDate.getMonth() + 1,
      year = newDate.getFullYear()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export const inputDate = (option: string) => {
  const currentDate = new Date(),
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

export const isNotEmptyObject = (obj: GenericObject) => {
  // console.log(Object.keys(obj).length)
  return Object.keys(obj).length != 0
}

export const displayFormDataEntries = (formData: FormData) => {
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
}


export const extractChangedValues = (obj: GenericObject) => {
  const dataObj: GenericObject = {}

  Object.entries(obj).forEach(([key, data]) => {
    if (data.isChanged) {
      dataObj[key] = data.value
    }
  })
  
  return dataObj
}

export const humanizeDate = (date: Date | string) => {
  // console.log('in humanize date function', date)
  return new Date(date).toLocaleDateString()
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: "EUR", style: "currency" })
export const formatCurrency = (number: number) => CURRENCY_FORMATTER.format(number)