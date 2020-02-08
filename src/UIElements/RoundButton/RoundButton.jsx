import React from 'react';
import { Link } from "react-router-dom";
import './RoundButton.css'

export function RoundButton({ icon }) {
  return (
    <Link to="/create" className="round-button">{icon}</Link>
  )
}
