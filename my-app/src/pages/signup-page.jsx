import "./Signup-page.css";
import { useState } from "react";
import googleIcon from "./google-icon.png";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) error = "Name is required";
      else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name can only contain letters and spaces";
    }

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
      else if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) error = "Password must contain at least one uppercase letter and one number";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => error === "");

    if (isValid) {
      alert("Sign-up successful!");
    }
  };

  return (
      <div className="signup-container">
        <div className="signup-header">
          <h1>Fit Trendz</h1>
        </div>
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>
          <p className="signup-subtitle">Enter your details to create an account.</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : "input-success"}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : "input-success"}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : "input-success"}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="google-signup">
            <img src={googleIcon} alt="Google" />
            Sign up with Google
          </div>
          <p className="signup-footer">
            Already have an account? <a href="/sign-in">Login</a>
          </p>
        </div>
      </div>
  );
}
