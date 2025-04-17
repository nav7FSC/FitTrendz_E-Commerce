import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Products from '../products/products';
import Recommended from '../Recommended/Recommended';
import Sidebar from '../Sidebar/Sidebar';
import Card from "../components/card";
import data from '../db/data'; // assuming you're using local data.js

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genderFilter = searchParams.get("gender");

  useEffect(() => {
    setProducts(data);
  }, []);

  const handleInputChange = (event) => setQuery(event.target.value);
  const handleChange = (event) => setSelectedCategory(event.target.value);
  const handleClick = (event) => setSelectedCategory(event.target.value);

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // 🔍 Gender Filter
    if (genderFilter === "women") {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === "women" || product.gender === "unisex"
      );
    } else if (genderFilter === "men") {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === "men" || product.gender === "unisex"
      );
    }

    // 🔍 Category, color, style, or price filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, style, newPrice, title }) => {
          const price = parseFloat(newPrice.replace("$", ""));
          if (selected === "50") return price >= 0 && price <= 50;
          if (selected === "100") return price > 50 && price <= 100;
          if (selected === "150") return price > 100 && price <= 150;
          if (selected === "200") return price > 150;

          return (
            category === selected ||
            color === selected ||
            style === selected ||
            title.toLowerCase().includes(selected.toLowerCase())
          );
        }
      );
    }

    // 🔍 Search Filter
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 🧱 Render Cards
    return filteredProducts.map(
      ({ img, title, rating, reviews, prevPrice, newPrice }) => (
        <Card
          key={title}
          img={img}
          title={title}
          star={rating}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <div>
      <Sidebar
        handleChange={handleChange}
        query={query}
        handleInputChange={handleInputChange}
      />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
    </div>
  );
}
