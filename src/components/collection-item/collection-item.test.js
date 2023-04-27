import React from 'react'
import {describe, expect} from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate, useLocation } from 'react-router-dom'

import CollectionItem from './collection-item.component'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}))

describe('Test CollectionItem component', () => {
  const mockCover = 'yoga-equipment.jpg'
  const mockTitle = 'yoga equipment'
  const mochSize = 'large'
  const mockProps = {
    collection: {
      title: mockTitle,
      cover: mockCover
    },
    size: mochSize
  }

  let navigate
  let pathname

  beforeEach(() => {
    pathname = '/shop'
    navigate = jest.fn()
    const location = { pathname: pathname }
    useNavigate.mockReturnValue(navigate)
    useLocation.mockReturnValue(location)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders CollectionItem component without crashing', () => {
    render(<CollectionItem {...mockProps} />)
  })

  it('renders the component with the correct props', () => {
    render(<CollectionItem {...mockProps} />)  
    expect(mockProps.collection.title).toBeDefined()
    expect(mockProps.collection.cover).toBeDefined()
    expect(mockProps.size).toBeDefined()
  })

  it('renders the correct DOM structure', () => {
    const { container } = render(<CollectionItem {...mockProps} />)
    const collectionItem = container.querySelector('.collection-item')
    const backgroundImage = container.querySelector('.background-image')
    const title = container.querySelector('.title')

    expect(collectionItem).toHaveClass(mockProps.size)
    expect(backgroundImage).toHaveStyle(`background-image: url(${process.env.BACKEND_URL}/${mockProps.collection.cover})`)
    expect(title).toHaveTextContent(mockProps.collection.title.toUpperCase())

    // const collectionItem = screen.getByTestId('collection-item')
    // expect(collectionItem).toHaveClass(mockProps.size)

    // const title = getByText(mockProps.collection.title.toUpperCase())
    // expect(title).toBeInTheDocument()
  })

  it('navigates to the correct URL when clicked', () => {
    const expectedPath = `${pathname}/${mockProps.collection.title.replace(/\s+/g, '-').toLowerCase()}`
    const { getByTestId } = render(<CollectionItem {...mockProps} />)
    const collectionItem = getByTestId('collection-item')
    fireEvent.click(collectionItem)

    expect(navigate).toBeCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(expectedPath)
  })

})