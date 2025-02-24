import sale2 from '../assets/sale2.webp'
import sale from '../assets/sale.webp'
import sale3 from '../assets/sale3.webp'
import rightArrow from '../assets/rightArrow.png'
import backArrow from '../assets/backArrow.png'
import './imageSlider.css'

import React, {useState} from 'react'

const IMAGES = [sale2,sale,sale3]






const imageSlider = () => {
  const [current, setCurrent] = useState(0)
  const length = IMAGES.length

 const nextSlide = () => {
  setCurrent(current === length - 1 ? 0 : current + 1)
  console.log(current)
 
 }

 const prevSlide = () => {
  setCurrent(current === 0 ? length-1 : current - 1)
  console.log(current)
 
 }

 return (
  <section className='slider'>
    <img src={backArrow} className='backArrow' onClick={prevSlide} alt="Previous Slide" />
    <img src={rightArrow} className='rightArrow' onClick={nextSlide} alt="Next Slide" />

    {IMAGES.map((slide, index) => (
      <div className={index === current ? 'slide-current' : 'slide'} key={index}>
        {index === current && <img src={slide} alt={`slide-${index}`} className='img' />}
      </div>
    ))}
  </section>
);
}

export default imageSlider
