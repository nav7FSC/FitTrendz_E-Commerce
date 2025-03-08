import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./pageStyling.css"; // Ensure styles are applied

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Order Summary Section */}
        <div className="checkout-section">
          <h3>Order Summary</h3>
          <p>Items in Cart: 3</p>
          <p>Subtotal: $150.00</p>
          <p>Shipping: $10.00</p>
          <p><strong>Total: $160.00</strong></p>
        </div>

        {/* Shipping Details */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Details</h3>
          <div className="input-group">
            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
          <input type="text" name="city" placeholder="City" required onChange={handleChange} />
          <input type="text" name="state" placeholder="State" required onChange={handleChange} />
          <input type="text" name="zip" placeholder="Zip Code" required onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" required onChange={handleChange} />

          {/* Payment Details */}
          <h3>Payment Information</h3>
          <input type="text" name="cardNumber" placeholder="Card Number" required onChange={handleChange} />
          <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" required onChange={handleChange} />
          <input type="text" name="cvv" placeholder="CVV" required onChange={handleChange} />

          <button type="submit" className="checkout-button">Place Order</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
