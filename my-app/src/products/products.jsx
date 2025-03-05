import React from 'react'
import './products.css'
import Card from "../components/card"


export default function Products() {
  return (
    <div>
      <section className='card-container'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  )
}