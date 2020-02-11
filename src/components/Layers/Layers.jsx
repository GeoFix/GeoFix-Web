import React from 'react'

import { PinRepair, PinShop, PinStar } from '../../assets/pins'

import './Layers.scss'

export const LayerItem = ({
  children, icon, value, onChange, checked,
}) => (
  <li className={`layers_item${checked ? ' layers_item--checked' : ''}`}>
    <label className="layers_label" htmlFor={`layer_${value}`}>
      <input className="layers_field" id={`layer_${value}`} type="checkbox" value={value} onChange={onChange} checked={checked} />
      <img className="layers_pin" src={icon} alt={children} />
      {children}
    </label>
  </li>
)

/**
 * Layers Component
 */
const Layers = ({ layers, open, onLayersChange }) => {
  const handleChange = e => {
    if (!onLayersChange) {
      return
    }

    onLayersChange({
      ...layers,
      [e.target.value]: e.target.checked,
    })
  }

  return (
    <ul className={`layers${open ? ' layers--open' : ''}`}>
      <LayerItem icon={PinStar} value="star" onChange={handleChange} checked={layers.star}>
        Bornes Star
      </LayerItem>
      <LayerItem icon={PinRepair} value="repair" onChange={handleChange} checked={layers.repair}>
        Bornes Réparation
      </LayerItem>
      <LayerItem icon={PinShop} value="retail" onChange={handleChange} checked={layers.retail}>
        Magasins
      </LayerItem>
    </ul>
  )
}

Layers.propTypes = {}

Layers.defaultProps = {
  open: false,
}

export default Layers
