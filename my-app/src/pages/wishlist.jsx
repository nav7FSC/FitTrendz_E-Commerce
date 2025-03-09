import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./pageStyling.css";

export default function Wishlist() {
    const navigate = useNavigate();

    const [wishlistItems, setWishlistItems] = useState([
        { id: 1, title: "Product A", price: 50, img: "https://via.placeholder.com/100" },
        { id: 2, title: "Product B", price: 75, img: "https://via.placeholder.com/100" },
    ]);

    const [cartItems, setCartItems] = useState([]);

    // Move item to Cart
    const moveToCart = (id) => {
        const item = wishlistItems.find((item) => item.id === id);
        setCartItems([...cartItems, item]);
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    };

    // Remove item from Wishlist
    const removeItem = (id) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="wishlist-container">
                <h2>My Wishlist</h2>

                {wishlistItems.length > 0 ? (
                    <div className="wishlist-items">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="wishlist-item">
                                <img src={item.img} alt={item.title} className="wishlist-img" />
                                <div className="wishlist-details">
                                    <h3>{item.title}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className="wishlist-buttons">
                                        <button className="wishlist-move-btn" onClick={() => moveToCart(item.id)}>
                                            Move to Cart
                                        </button>
                                        <button className="wishlist-remove-btn" onClick={() => removeItem(item.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Your wishlist is empty. <a href="/catalog">Continue shopping</a></p>
                )}

                <button className="continue-shopping-btn" onClick={() => navigate("/catalog")}>
                    Continue Shopping
                </button>
            </div>
            <Footer />
        </>
    );
}
