import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({ value, onChange, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      Search
    </button>
  </form >

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SearchBar