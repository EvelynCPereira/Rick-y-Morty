import React from 'react';
import videoError404 from "../../assets/videoError404.mp4"
import './styleError.css';

function Error() {
  return (
    <div className='error-container'>
      <video className='error-video' src={videoError404} autoPlay loop muted playsInline />
    </div>
  );
}

export default Error;
