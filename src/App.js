import React, { Component } from 'react'

import SearchBar from './components/SearchBar'
import Table from './components/Table'
import '../styles/App.css'

const DEFAULT_QUERY = 'redux'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

class App extends Component {
  // The constructor is called only once when the component initializes
  constructor(props) {
    // super(props) calls the constructor of the extended
    // Component class.
    // sets `this.props` in the constructor
    super(props)

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onDismiss(id) {
    // filter out target objectID from state
    const updatedList = this.state.list.filter(item => item.objectID !== id)

    this.setState({ list: updatedList })
  }

  render() {
    const { searchTerm, result } = this.state

    if (!result) { return null }

    return (
      <div className="page">
        <div className="interactions">
          <SearchBar
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
        </SearchBar>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}

export default App