import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "./sign-in.css";
import axios from "axios";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [user, setUser] = useState(null);

  const authenticate = (formData) => {
    axios
      .post("http://localhost:3000/api/auth/login", formData)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.token);
        setUser(response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validate = (name, value) => {
    let tempErrors = { ...errors };

    if (name === "email") {
      if (!value) tempErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        tempErrors.email = "Email is incorrect";
      else delete tempErrors.email;
    }

    if (name === "password") {
      if (!value) tempErrors.password = "Password is required";
      else if (value.length < 6) tempErrors.password = "Password is incorrect";
      else delete tempErrors.password;
    }

    setErrors(tempErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      authenticate(formData);
    }
  };

  useEffect(() => {
    if (user !== null) {
      alert(user);
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <h1>LOGIN</h1>
        <form className="signin-form">
          <input
            type="text"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.email}
            name="email"
            className={touched.email ? (errors.email ? "input-error" : "input-success") : ""}
          />
          <span className="error-message">{touched.email && errors.email}</span>

          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.password}
            name="password"
            className={touched.password ? (errors.password ? "input-error" : "input-success") : ""}
          />
          <span className="error-message">{touched.password && errors.password}</span>

          <button onClick={handleSubmit}>Login</button>
          <p>
            Don't have an account? <a href="/signup-page">Sign-Up</a>
          </p>
        </form>
      </div>
    </>
  );
}