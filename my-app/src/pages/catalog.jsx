import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Products from '../products/products';
import Recommended from '../Recommended/Recommended';
import Sidebar from '../Sidebar/Sidebar';
import Card from "../components/card";
import { fetchAllProducts } from '../services/apiRequests';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

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

    // Input query filter
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredProducts.map(
      ({ image, title, rating, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={image}
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
      <Navbar />
      <Sidebar
        handleChange={handleChange}
        query={query}
        handleInputChange={handleInputChange}
      />
      <Recommended handleClick={handleClick} />
      <Products result={result} />
      <Footer />
    </div>
  );
}
