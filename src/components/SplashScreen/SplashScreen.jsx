import React from 'react'

import './SplashScreen.scss'

/**
 * SplashScreen Component
 */
const SplashScreen = ({ image, message, blink }) => (
  <div className={`splashscreen${blink ? ' splashscreen--blink' : ''}`}>
    <img className="splashscreen_image" src={image} alt={message} />
    <p className="splashscreen_message">{message}</p>
  </div>
)

SplashScreen.propTypes = {}

SplashScreen.defaultProps = {}

export default SplashScreen
