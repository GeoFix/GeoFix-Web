import React from 'react'
import { bool, func, string } from 'prop-types'

import './InputField.css'

export function InputField ({ inputRef, label, name, required, type }) {
  const isCheckbox = type === 'checkbox';
  const labelField = label ? <label htmlFor={name}>{label}</label> : '';

  return (
    <span className={`${isCheckbox ? 'checkbox-' : ''}input-field`}>
      { !isCheckbox && labelField }
      <input type={type} required={required} ref={inputRef} name={name} />
      { isCheckbox && labelField }
    </span>
  )
}

InputField.defaultProps = {
  required: false,
  type: 'text',
};

InputField.propTypes = {
  inputRef: func,
  label: string.isRequired,
  name: string.isRequired,
  required: bool,
  type: string,
};
