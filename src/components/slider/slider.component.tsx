import React from 'react';

import Image1 from '../../assets/slider/slider-1.jpg';
import Image2 from '../../assets/slider/slider-2.jpg';
import Image3 from '../../assets/slider/slider-3.jpg';

import './slider.styles.scss';

const Slider = () => (
  <div className="carousel-wrapper">
    {/* <h1>Do yoga with style.</h1>
    <h1>Revive your spirit.</h1>
    <h1>For your inner peace.</h1> 
    <h1>For your inner peace.</h1>
    <h1>For your inner peace.</h1> */}
    <div className="carousel-container">
      <div className="carousel">
        <div style={{backgroundImage: `url(${Image1})`}}></div>
        <div style={{backgroundImage: `url(${Image2})`}}></div>
        <div style={{backgroundImage: `url(${Image3})`}}></div>
      </div>
    </div>
  </div>
)

export default Slider;