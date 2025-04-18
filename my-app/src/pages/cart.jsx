import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import "./pageStyling.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal - (subtotal * discount) / 100 + tax;

  const handleCheckout = () => {
    navigate("/check-out");
  };

  return (
    <>
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
                    <p>Size: {item.size}</p>
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

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax (8%): ${tax.toFixed(2)}</p>
              {discount > 0 && <p>Discount: -{discount}%</p>}
              <p><strong>Total: ${total.toFixed(2)}</strong></p>

              <div className="promo-section">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>

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
    </>
  );
}
