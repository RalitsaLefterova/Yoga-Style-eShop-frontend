import React from 'react'
import { render } from '@testing-library/react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { useLocation, MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import * as ReactReduxHooks from 'react-redux'

import { Collection } from '../../shared/types/collections'
import { fetchCollectionsRequested } from '../../redux/collections/collections.actions'
import CollectionsActionTypes from '../../redux/collections/collections.types'

import CollectionsList from './collections-list.component'

const mockStore = configureStore([createSagaMiddleware()])

jest.mock('react-redux', () => {
  const originalModule = jest.requireActual('react-redux')
  return {
    ...originalModule,
    useSelector: jest.fn(),
    useDispatch: jest.fn()
  }
})

describe('Test CollectionsList component', () => {
  const mockCollectionsList: Collection[] = [
    { _id: '1', title: 'Collection 1' },
    { _id: '2', title: 'Collection 2' }
  ]

  const navigate = jest.fn()
  const pathname = '/shop'

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      collections: {
        collectionsList: [],
        isLoading: false
      }
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('1v. dispatches fetchCollectionsRequested action on mount', () => {
    /* mocking useDispatch on our mock store  */
    jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => store.dispatch)

    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)
    
    // Dispatch the action
    store.dispatch(fetchCollectionsRequested())

    // Test if your store dispatched the expected actions
    const action = store.getActions()
    const expectedPayload = { type: CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED }
    expect(action).toEqual([expectedPayload])
  })

  // it('2v. dispatches fetchCollectionsRequested action on mount', () => {
  //   // Initialize mockstore with empty state
  //   const initialState = {}
  //   const store = mockStore(initialState)

  //   /* mocking useDispatch on our mock store  */
  //   jest.spyOn(ReactReduxHooks, 'useDispatch').mockImplementation(() => store.dispatch)

  //   render(
  //     <Provider store={store}>
  //       <CollectionsList />
  //     </Provider>
  //   )

  //   expect(store.getActions()).toContainEqual(fetchCollectionsRequested())
  // })

  it('renders Spinner component when `isLoading` is true', () => {
    jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation((selector) => selector({
      collections: {
        collectionsList: [],
        isLoading: true
      }
    }))

    const { container } = render(<CollectionsList />)
    const spinner = container.querySelector('.spinner-container')
    expect(spinner).toBeInTheDocument()
  })

  it('renders collections when loading is complete (`isLoading` is false)', async () => {
    jest.spyOn(ReactReduxHooks, 'useSelector').mockImplementation((selector) => selector({
      collections: {
        collectionsList: mockCollectionsList,
        isLoading: false
      }
    }))

    const { container } = render(
      <Provider store={mockStore()}>
        <MemoryRouter initialEntries={[pathname]}>
          <CollectionsList />
        </MemoryRouter>
      </Provider>
    )

    // Check that the spinner is not rendered
    const spinner = container.querySelector('.spinner-container')
    expect(spinner).not.toBeInTheDocument()

    // Check that the collections container is rendered
    expect(container.getElementsByClassName('collection-menu').length).toBe(1)
    expect(document.getElementsByClassName('collection-item').length).toBe(2)

    // alternative (working) variant
    // const collectionsContainer = document.querySelector('.collection-menu')
    // expect(collectionsContainer).toBeInTheDocument()
    // const collectionItem = document.querySelector('.collection-item')
    // expect(collectionItem).toBeInTheDocument()
  })

})