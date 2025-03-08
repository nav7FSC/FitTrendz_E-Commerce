import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./pageStyling.css";

export default function Cart() {
  const navigate = useNavigate(); // Enables navigation

  // Sample cart items (Can be replaced with state management/store)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Product A",
      price: 50,
      quantity: 1,
      img: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Product B",
      price: 75,
      quantity: 1,
      img: "https://via.placeholder.com/100",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Function to update quantity
  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Function to apply a promo code
  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal - (subtotal * discount) / 100 + tax;

  // Redirect to checkout
  const handleCheckout = () => {
    navigate("/check-out"); // Redirects to Checkout Page
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.title} className="cart-img" />
                  <div className="cart-details">
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, "decrease")}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, "increase")}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax (8%): ${tax.toFixed(2)}</p>
              {discount > 0 && <p>Discount: -{discount}%</p>}
              <p><strong>Total: ${total.toFixed(2)}</strong></p>

              {/* Promo Code Section */}
              <div className="promo-section">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>

              {/* Buttons for Checkout and Continue Shopping */}
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate("/catalog")}>
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <p>Your cart is empty. <a href="/catalog">Continue shopping</a></p>
        )}
      </div>
      <Footer />
    </>
  );
}
