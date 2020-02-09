import React, {useState} from 'react';
import Select from "react-select";
import {Search} from "react-feather";

import './SearchField.scss';

/**
 * SearchField Component
 */
const SearchField = ({name, options = [], onSearch}) => {

  return (
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
  );
};

SearchField.propTypes = {};

SearchField.defaultProps = {};

export default SearchField;
