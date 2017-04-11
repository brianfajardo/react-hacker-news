import React, { Component } from 'react'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

// ES6 - .includes() returns boolean
const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())

class App extends Component {
  // The constructor is called only once when the component initializes
  constructor(props) {
    // super(props) calls the constructor of the extended
    // Component class.
    // sets `this.props` in the constructor
    super(props)

    this.state = {
      list,
      searchTerm: ''
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id)

    this.setState({ list: updatedList })
  }

  render() {
    const { searchTerm, list } = this.state

    return (
      <div className="App">
        <SearchBar
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </SearchBar>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}

const SearchBar = ({ value, onChange, children }) =>
  <form>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    {children}
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div>
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID}>
        <a href={item.url}>{item.title}</a>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>{item.objectID}</span>
        <span>
          <Button onClick={() => onDismiss(item.objectID)}>
            Dismiss
              </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App
