import React from 'react'
import { bool, func, string } from 'prop-types'

import './InputField.css'

export function InputField ({ error, inputRef, label, name, required, type, defaultValue, disabled }) {
  const labelAtRight = type === 'checkbox' || type === 'number';
  const labelField = label ? <label htmlFor={name}>{label}{required ? ' *' : ''}</label> : '';

  return (
    <div className={`${labelAtRight ? 'label-right-' : ''}input-field`}>
      { !labelAtRight && labelField }
      <input
        type={type}
        required={required}
        ref={inputRef}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        min={type === 'number' ? 0 : null}
      />
      { labelAtRight && labelField }
      {error && <span className="input-error">This field is required</span>}
    </div>
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
