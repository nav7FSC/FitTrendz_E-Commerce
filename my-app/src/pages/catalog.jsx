import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Products from '../products/products'
import Recommended from '../Recommended/Recommended'
import Sidebar from '../Sidebar/Sidebar'

import products from '../db/data'
export default function catalog() {
 // ----------- Input Filter -----------
//  const [query, setQuery] = useState("");

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

  return (
    <div>
        <Navbar/>
        <Sidebar />
        <Recommended />
        
      <Products/>
      <Footer/>
    </div>
  )
}
