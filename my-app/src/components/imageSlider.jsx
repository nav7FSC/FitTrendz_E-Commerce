import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import rightArrow from '../assets/rightArrow.png';
import backArrow from '../assets/backArrow.png';

import './componentStyling.css';

const VIDEOS = [video1, video2, video3];

const VideoSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = VIDEOS.length;
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <section className='slider'>
      <img src={backArrow} className='backArrow' onClick={prevSlide} alt="Previous Slide" />
      <img src={rightArrow} className='rightArrow' onClick={nextSlide} alt="Next Slide" />

      {VIDEOS.map((video, index) => (
        <div className={index === current ? 'slide-current' : 'slide'} key={index}>
          {index === current && (
            <div className="video-container">
              <video className='video' src={video} autoPlay loop muted playsInline />
              <button className="shop-now-btn video-shop-btn" onClick={() => navigate('/catalog')}>
                Shop Now
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default VideoSlider;
