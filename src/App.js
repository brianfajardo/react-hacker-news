import React, { Component } from 'react'

import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Button from './components/Button'
import '../styles/App.css'

import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,

  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from './constants'

// Higher order function (HOF)
const withLoading = Component => ({ isLoading, ...rest }) => isLoading ? <div>Loading..</div> : <Component {...rest} />

// Using above HOF to enhance Button component to a higher order component
const ButtonWithLoading = withLoading(Button)

class App extends Component {
  // The constructor is called only once when the component initializes
  // super(props) calls the constructor of the extended Component class.
  // sets `this.props` in the constructor
  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.checkIfResultsAlreadyExist = this.checkIfResultsAlreadyExist.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onSort = this.onSort.bind(this)
  }

  checkIfResultsAlreadyExist(searchTerm) {
    return !this.state.results[searchTerm]
  }

  onSort(sortKey) {
    // Determine if list has already been sorted by sortKey already
    // If it is, reverse isSortReverse state
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse

    this.setState({ sortKey, isSortReverse })
  }

  setSearchTopStories(result) {
    // When fetching the next page of data, new data will overwrite
    // previous page of data.
    // We want to concatenate the old and new page data when
    // fetchSearchTopStories is invoked.
    const { hits, page } = result
    const { searchKey, results } = this.state

    const previousHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...previousHits, ...hits]

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    })
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true })

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state
    e.preventDefault()
    this.setState({ searchKey: searchTerm })

    // Add check to prevent requests for already cached results
    if (this.checkIfResultsAlreadyExist(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    }
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]

    const updatedHits = hits.filter(item => item.objectID !== id)

    // Immutable state with spread operator
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state

    // Default to page 0 on initial mount (results === null)
    // On new API fetch, page = last && statement
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []

    return (
      <div className="page">
        <div className="interactions">
          <SearchBar
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        <Table
          list={list}
          sortKey={sortKey}
          onSort={this.onSort}
          isSortReverse={isSortReverse}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    )
  }
}

export default App