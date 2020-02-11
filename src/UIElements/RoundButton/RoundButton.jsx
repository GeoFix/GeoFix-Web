import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import './RoundButton.css'

export function RoundButton({ icon }) {
  return (
    <Link to="/create" className="round-button">{icon}</Link>
  )
}

RoundButton.propTypes = {
  icon: object.isRequired,
}
