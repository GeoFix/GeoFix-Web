import React from 'react';

import './SplashScreen.scss';

/**
 * SplashScreen Component
 */
export const SplashScreen = ({image, message, blink}) => {
  return (
    <div className={`splashscreen${blink ? ' splashscreen--blink' : ''}`}>
      <img className="splashscreen_image" src={image} alt={message}/>
      <p className="splashscreen_message">{message}</p>
    </div>
  );
};

SplashScreen.propTypes = {};

SplashScreen.defaultProps = {};
