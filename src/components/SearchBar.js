import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    const {
      value,
      onChange,
      onSubmit
    } = this.props

    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={node => { this.input = node }}
        />
        <button type="submit">
          Search
        </button>
      </form >
    )
  }
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SearchBar