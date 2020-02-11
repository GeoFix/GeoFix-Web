import React from 'react'
import Select from 'react-select'

import './SearchField.scss'

/**
 * SearchField Component
 */
const SearchField = ({ name, options = [], onSearch }) => (
  <form className="search-field">
    <Select
      options={options}
      onChange={onSearch}
      name={name}
      placeholder="Rechercher un outil..."
      className="search-field_input"
      classNamePrefix="react-select"
      isMulti
    />
  </form>
)

SearchField.propTypes = {}

SearchField.defaultProps = {}

export default SearchField
