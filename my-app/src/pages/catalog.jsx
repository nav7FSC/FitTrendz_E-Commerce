import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Products from '../products/products'
import Recommended from '../Recommended/Recommended'
import Sidebar from '../Sidebar/Sidebar'
import Card from "../components/card"
import {fetchAllProducts} from '../services/apiRequests'


// import products from '../db/data'

const products = await fetchAllProducts()
console.log(products)

export default function catalog() {

  const[selectedCategory,setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

 // ----------- Input Filter -----------
//  

//  const handleInputChange = (event) => {
//    setQuery(event.target.value);
//  };

//  const filteredItems = products.filter(
//    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
//  );

 // ----------- Radio Filtering -----------
 const handleChange = (event) => {
   setSelectedCategory(event.target.value);
 };

 // ------------ Button Filtering -----------
 const handleClick = (event) => {
   setSelectedCategory(event.target.value);
 };
//when we add the search feature, we have to add a query value to the input here
function filteredData(products, selected) {
  let filteredProducts = products;

  if (selected) {
    filteredProducts = filteredProducts.filter(
      ({ category, color, style, newPrice, title }) => {
        // Convert newPrice to a number (remove `$` and parse as float)
        const price = parseFloat(newPrice.replace("$", ""));

        // Apply price filtering based on selected range
        if (selected === "50") return price >= 0 && price <= 50;
        if (selected === "100") return price > 50 && price <= 100;
        if (selected === "150") return price > 100 && price <= 150;
        if (selected === "200") return price > 150; // Over $150

        // Check if selected matches category, color, title, or style
        return (
          category === selected ||
          color === selected ||
          style === selected ||  // <- Ensure style filtering works
          title.toLowerCase().includes(selected.toLowerCase())
        );
      }
    );
  }
  return filteredProducts.map(({image, title, rating, reviews, prevPrice, newPrice}) => 
    (
    <Card
      key={Math.random()}
      img={image}
      title={title}
      star={rating}
      reviews={reviews}
      prevPrice={prevPrice}
      newPrice={newPrice}
    />
  ));
}

    
    const result = filteredData(products,selectedCategory)

  return (
    <div>
        <Navbar/>
        <Sidebar handleChange={handleChange}/>
        <Recommended handleClick={handleClick}/>
        
      <Products result = {result}/>
      <Footer/>
    </div>
  )
}
