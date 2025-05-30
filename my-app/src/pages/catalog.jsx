import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Products from '../products/products';
import Recommended from '../Recommended/Recommended';
import Sidebar from '../Sidebar/Sidebar';
import Card from "../components/card";
import data from '../db/data'; 
import SpinWheel from '../components/SpinWheel'; 

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [showWheel, setShowWheel] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genderFilter = searchParams.get("gender");

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = scrollTop / (documentHeight - windowHeight);

      if (scrollPercent > 0.5 && !showWheel && !hasSpun) {
        setShowWheel(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showWheel, hasSpun]);

  const handleInputChange = (event) => setQuery(event.target.value);
  const handleChange = (event) => setSelectedCategory(event.target.value);
  const handleClick = (event) => setSelectedCategory(event.target.value);

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (genderFilter === "women") {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === "women" || product.gender === "unisex"
      );
    } else if (genderFilter === "men") {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === "men" || product.gender === "unisex"
      );
    }

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

    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ flex: 1 }}>
        <Sidebar
          handleChange={handleChange}
          query={query}
          handleInputChange={handleInputChange}
        />
        <Recommended handleClick={handleClick} />
        {result.length > 0 ? (
          <Products result={result} />
        ) : (
          <div style={{ minHeight: '300px', textAlign: 'center', padding: '80px 0' }}>
            <h2>No results found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
        <SpinWheel
          show={showWheel}
          onClose={() => {
            setShowWheel(false);
            setHasSpun(true);
          }}
        />
      </div>
      
    </div>
  );
}
