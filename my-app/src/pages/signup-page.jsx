import "./Signup-page.css";
import { useState, useEffect } from "react";
import googleIcon from "./google-icon.png";
import axios from "axios";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const validate = (name, value) => {
    let error = "";

    if (name === "first_name" || name === "last_name") {
      if (!value) error = `${name.replace("_", " ")} is required`;
      else if (!/^[A-Za-z\s]+$/.test(value)) error = `${name.replace("_", " ")} can only contain letters and spaces`;
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

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value !== "");
    if (isValid) {
      createUser(formData);
      alert("Sign-up successful!");
    }
  };

  const createUser = (formData) => {
    axios
      .post("http://localhost:3000/api/auth/register", formData)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setSuccess("User Created");
      })
      .catch((error) => {
        setSuccess("Failed to Create");
        console.error(error);
      });
  };

  useEffect(() => {
    if (success !== null) {
      alert(success);
    }
  }, [success]);

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Fit Trendz</h1>
      </div>
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">Enter your details to create an account.</p>
        <form className="signup-form">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.first_name}
            name="first_name"
            className={errors.first_name ? "input-error" : formData.first_name ? "input-success" : ""}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.last_name}
            name="last_name"
            className={errors.last_name ? "input-error" : formData.last_name ? "input-success" : ""}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            value={formData.email}
            name="email"
            className={errors.email ? "input-error" : formData.email ? "input-success" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            className={errors.password ? "input-error" : formData.password ? "input-success" : ""}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
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
