import React from 'react'
import './Recommended.css'

export default function Recommended() {
  return (
    <div className='reccommended-container'>
      <h2 className='title'>Recommended</h2>
      <div className='recommended-flex'>
        <button className='btns'>All Products</button>
        <button className='btns'>Comfort</button>
        <button className='btns'>Professional</button>
        <button className='btns'>Athletic</button>
        <button className='btns'>Other</button>
      </div>

    </div>
  )
}
