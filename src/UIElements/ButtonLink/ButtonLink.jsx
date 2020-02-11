import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'
import './ButtonLink.css'

export function ButtonLink({ label, link }) {
  return (
    <Link to={link} className="button-link">{label}</Link>
  )
}

ButtonLink.propTypes = {
  label: string.isRequired,
  link: string.isRequired,
}
