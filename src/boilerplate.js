import React from 'react';
import './styling/boiler.css';


const notificationPop = (link) => {
  const sound = new Audio(link); // Path to your sound file
  sound.play();
};

const FadingImage = () => {
  return (
    <div className="fading-image-container">
      <img src={'logo.png'} alt="Fading" />
    </div>
  );
};

export { notificationPop, FadingImage };
