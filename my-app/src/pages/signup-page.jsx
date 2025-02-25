import "./Signup-page.css"
import { useState,  useEffect} from "react";
import googleIcon from "./google-icon.png";
import axios from "axios";



export default function SignUpPage() {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

    const createUser = (formData) => {
      axios
        .post("http://localhost:3000/api/auth/register", formData)
        .then((response) => {
          console.log(response)
          console.log(response.data)
          setSuccess("User Created")
        })
        .catch((error) => {
          setSuccess("Failed to Create")
          console.error(error);
        });
    };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.name)) tempErrors.name = "Name can only contain letters and spaces";
    
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) tempErrors.email = "Invalid email format";
    
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) tempErrors.password = "Password must contain at least one uppercase letter and one number";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData)
    if (validate()) {
       // createUser(formData) TODO validate doesn't succeed when it should
      alert("Sign-up successful!");
    }
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
      <input type="text"  placeholder="First Name" onChange={handleChange} value={formData.first_name} name="first_name"/>
      <label>Last Name</label>
      <input type="text" placeholder="Last Name" onChange={handleChange} value={formData.last_name} name="last_name"/>
      <label>Email</label>
      <input type="email" placeholder="E-mail" onChange={handleChange} value={formData.email} name="email"/>
      <label>Password</label>
      <input type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password"/>
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
