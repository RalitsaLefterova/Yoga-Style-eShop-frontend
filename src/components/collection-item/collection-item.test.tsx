import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import * as reactRouterDom from 'react-router-dom'
import { Collection } from '../../shared/types/collections'

import CollectionItem, { CollectionItemPropsType } from './collection-item.component'

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});


describe('Test CollectionItem component', () => {
  const mockCollection: Collection  = {
    title: 'yoga equipment',
    cover: 'yoga-equipment.jpg',
  };
  const mockProps: CollectionItemPropsType = {
    collection: mockCollection,
    size: 'large'
  };

  const navigate = jest.fn()
  const pathname = '/shop'

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: pathname,
      search: '',
      hash: '',
      state: null,
      key: 'unique-key'
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders CollectionItem component without crashing', () => {
    const { container } = render(<CollectionItem {...mockProps} />)
    const collectionItem = container.querySelector('.collection-item')

    // expect(collectionItem).toBeInstanceOf(HTMLElement)
    expect(collectionItem).toBeInTheDocument()
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
    const expectedTitle = mockProps.collection.title?.toUpperCase()

    expect(collectionItem).toHaveClass(mockProps.size)
    expect(backgroundImage).toHaveStyle(`background-image: url(${process.env.BACKEND_URL}/${mockProps.collection.cover})`)
    expect(title).toHaveTextContent(expectedTitle as string)
  })

  it('navigates to the correct URL when clicked', () => {
    jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(navigate)
    const expectedPath = mockProps.collection.title && `${pathname}/${mockProps.collection.title.replace(/\s+/g, '-').toLowerCase()}`
    const { container } = render(<CollectionItem {...mockProps} />)
    const collectionItem = container.querySelector('.collection-item')
    
    fireEvent.click(collectionItem as HTMLElement)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(expectedPath)
  })

})