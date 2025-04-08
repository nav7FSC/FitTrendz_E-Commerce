import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../db/data";
import "./product-details.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


export default function ProductDetails() {
  const { title } = useParams();
  const product = data.find((item) => item.title === decodeURIComponent(title));

  const [selectedSize, setSelectedSize] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const { addToCart } = useCart();

const handleAddToCart = () => {
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  addToCart(product, selectedSize);
  alert(`✅ ${product.title} (Size ${selectedSize}) added to cart!`);
  navigate("/cart");
};

const { addToWishlist } = useWishlist();

const handleWishlist = () => {
  setWishlisted(true);
  addToWishlist({
    ...product,
    id: product.title, // use title as unique ID
    price: parseFloat(product.newPrice.replace("$", "")),
    img: product.img,
  });
  alert(`❤️ ${product.title} added to wishlist!`);
};


  if (!product) {
    return <div className="product-details"><h2>Product not found.</h2></div>;
  }

  return (
    <>
      <Navbar />

      <div className="product-details">
        <div className="image-section">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="info-section">
          <h1>{product.title}</h1>
          <p><strong>Rating:</strong> {product.rating} {product.reviews}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Style:</strong> {product.style}</p>
          <p className="price">
            <span className="prev">{product.prevPrice}</span>
            <span className="new">{product.newPrice}</span>
          </p>

          <label htmlFor="size-select"><strong>Select Size:</strong></label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={handleSizeChange}
            className="size-dropdown"
          >
            <option value="">-- Choose a size --</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <div className="button-row">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-btn ${wishlisted ? "added" : ""}`}
              onClick={handleWishlist}
              disabled={wishlisted}
            >
              {wishlisted ? "Wishlisted ❤️" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
