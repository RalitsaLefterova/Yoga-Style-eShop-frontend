import React from 'react'
import { render, fireEvent, screen, RenderResult } from '@testing-library/react'
// import { describe, expect, jest } from '@jest/globals'
import { useNavigate, useLocation } from 'react-router-dom'

import CollectionItem, { CollectionItemPropsType } from './collection-item.component'

jest.mock('react-router-dom', () => ({
  // ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}))

describe('Test CollectionItem component', () => {
  const mockCollection = {
    title: 'yoga equipment',
    cover: 'yoga-equipment.jpg',
  };
  const mockProps: CollectionItemPropsType = {
    collection: mockCollection,
    size: 'large'
  };

  let navigate: ReturnType<typeof useNavigate>
  let location: ReturnType<typeof useLocation>
  let pathname: string

  beforeEach(() => {
    pathname = '/shop'
    location = { 
      pathname: pathname,
      search: '',
      hash: '',
      state: null,
      key: 'unique-key'
    }

    navigate && (useNavigate as jest.Mock).mockReturnValue(navigate)
    location && (useLocation as jest.Mock).mockReturnValue(location)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders CollectionItem component without crashing', () => {
    const { getByTestId } = render(<CollectionItem {...mockProps} />)
    expect(getByTestId('collection-item')).toBeInstanceOf(HTMLElement)
    expect(getByTestId('collection-item')).toBeInTheDocument()
  })
  
  it('renders the component with the correct props', () => {
    render(<CollectionItem {...mockProps} />)  
    expect(mockProps.collection.title).toBeDefined()
    expect(mockProps.collection.cover).toBeDefined()
    expect(mockProps.size).toBeDefined()
  })

  // it('renders the correct DOM structure', () => {
  //   const { container } = render(<CollectionItem {...mockProps} />)

  //   const collectionItem = container.querySelector('.collection-item')
  //   const backgroundImage = container.querySelector('.background-image')
  //   const title = container.querySelector('.title')

  //   expect(collectionItem).toHaveClass(mockProps.size)
  //   expect(backgroundImage).toHaveStyle(`background-image: url(${process.env.BACKEND_URL}/${mockProps.collection.cover})`)
  //   expect(title).toHaveTextContent(mockProps.collection.title && mockProps.collection.title.toUpperCase())

  //   // const collectionItem = screen.getByTestId('collection-item')
  //   // expect(collectionItem).toHaveClass(mockProps.size)

  //   // const title = getByText(mockProps.collection.title.toUpperCase())
  //   // expect(title).toBeInTheDocument()
  // })

  it('navigates to the correct URL when clicked', () => {
    const expectedPath = mockProps.collection.title && `${pathname}/${mockProps.collection.title.replace(/\s+/g, '-').toLowerCase()}`
    const { getByTestId }: RenderResult = render(<CollectionItem {...mockProps} />)
    const collectionItem = getByTestId('collection-item')
    fireEvent.click(collectionItem)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(expectedPath)
  })

})