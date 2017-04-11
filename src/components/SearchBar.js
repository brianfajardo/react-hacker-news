import React from 'react'

const SearchBar = ({ value, onChange, children }) =>
  <form>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    {children}
	</form>

export default SearchBar