import React from 'react'
import { string } from 'prop-types'
import './Button.css'

export function Button({ label, type }) {
  return (
    <button type={type}>{label}</button>
  )
}

Button.defaultProps = {
  type: 'button',
}

Button.propTypes = {
  label: string.isRequired,
  type: string,
}
