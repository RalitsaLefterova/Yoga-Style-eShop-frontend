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

    default:
  }
}