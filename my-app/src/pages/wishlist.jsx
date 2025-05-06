import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./pageStyling.css";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    moveToCart(item, addToCart);
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      

      <main style={{ flex: 1, padding: "40px 20px" }}>
        <div className="wishlist-container">
          <h2>My Wishlist</h2>

          {wishlistItems.length > 0 ? (
            <div className="wishlist-items">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <img src={item.img} alt={item.title} className="wishlist-img" />
                  <div className="wishlist-details">
                    <h3>{item.title}</h3>
                    <p>Size: {item.size}</p>
                    <p>{item.newPrice}</p>
                    <div className="wishlist-buttons">
                      <button
                        className="wishlist-move-btn"
                        onClick={() => handleMoveToCart(item)}
                      >
                        Move to Cart
                      </button>
                      <button
                        className="wishlist-remove-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ paddingTop: "20px" }}>
              Your wishlist is empty. <a href="/catalog">Continue shopping</a>
            </p>
          )}

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/catalog")}
            style={{ marginTop: "30px" }}
          >
            Continue Shopping
          </button>
        </div>
      </main>

      
    </div>
  );
}
