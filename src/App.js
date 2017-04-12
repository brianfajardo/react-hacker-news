import React, { Component } from 'react'

import SearchBar from './components/SearchBar'
import Table from './components/Table'
import Button from './components/Button'
import '../styles/App.css'

// Default variables
const DEFAULT_QUERY = 'react'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = 15

// Hacker News API URL decomposed
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${DEFAULT_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`

class App extends Component {
  // The constructor is called only once when the component initializes
  // super(props) calls the constructor of the extended Component class.
  // sets `this.props` in the constructor
  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
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
      }
    })
  }

  fetchSearchTopStories(searchTerm, page) {
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
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onDismiss(id) {
    // Filter out target objectID from hits
    const { hits } = this.state.result
    const updatedHits = hits.filter(item => item.objectID !== id)

    // Immutable state with spread operator
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    })
  }

  render() {
    const { searchTerm, results, searchKey } = this.state
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
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            Show Me More
          </Button>
        </div>
      </div>
    )
  }
}

export default App