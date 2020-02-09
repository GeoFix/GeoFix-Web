import React, {useState} from 'react';
import Select from "react-select";
import {Search} from "react-feather";

import './SearchField.scss';

/**
 * SearchField Component
 */
const SearchField = ({name, options = [], onSearch}) => {
  const [values, setValues] = useState([]);

  const handleSearch = () => {
    if (!onSearch) {
      return;
    }

    onSearch(values || []);
  };

  return (
    <div className="search-field">
      <Select
        options={options}
        onChange={setValues}
        value={values}
        name={name}
        placeholder="Rechercher un outil..."
        className="search-field_input"
        classNamePrefix="react-select"
        isMulti
      />
      <button onClick={handleSearch} className="search-field_button"><Search className="search-field_icon" /></button>
    </div>
  );
};

SearchField.propTypes = {};

SearchField.defaultProps = {};

export default SearchField;
