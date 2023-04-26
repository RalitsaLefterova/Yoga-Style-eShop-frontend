import {describe, expect } from '@jest/globals'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate, useLocation } from 'react-router-dom';

import CollectionItem from './collection-item.component'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Test render CollectionItem component with props', () => {
  const mockCover = 'yoga-equipment.jpg';
  const mockTitle = 'yoga equipment';
  const mochSize = 'large';
  const mockProps = {
    collection: {
      title: mockTitle,
      cover: mockCover
    },
    size: mochSize
  }

  let navigate;
  let pathname;

  beforeEach(() => {
    pathname = '/shop';
    navigate = jest.fn();
    const location = { pathname: pathname };
    useNavigate.mockReturnValue(navigate);
    useLocation.mockReturnValue(location);
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('component has `title` and `cover`', () => {
    render(<CollectionItem {...mockProps} />);
    expect(mockProps.collection.title).toBeDefined();
    expect(mockProps.collection.cover).toBeDefined();
  })

  it('renders the collection title correctly', () => {
    const { getByText } = render(<CollectionItem {...mockProps} />)
    const title = getByText(mockProps.collection.title.toUpperCase())
    expect(title).toBeInTheDocument()
  })

  it('sets the background image URL correctly', () => {
    const { container } = render(<CollectionItem {...mockProps} />)
    const backgroundImage = container.querySelector('.background-image')
    expect(backgroundImage).toHaveStyle(`background-image: url(${process.env.BACKEND_URL}/${mockProps.collection.cover})`)
  })

  it('should call navigate with the right pathname', () => {
    const expectedPath = `${pathname}/${mockProps.collection.title.replace(/\s+/g, '-').toLowerCase()}`
    const { getByTestId } = render(<CollectionItem {...mockProps} />)
    const collectionItem = getByTestId('collection-item')
    fireEvent.click(collectionItem)

    expect(navigate).toBeCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(expectedPath)
  })

})