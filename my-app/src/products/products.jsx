import React from 'react'
import './products.css'



export default function Products({result}) {
  return (
    <div>
      <section className='card-container'>
        {result}
      </section>
    </div>
  )
}