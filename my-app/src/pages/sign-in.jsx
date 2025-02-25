import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import "./sign-in.css"
import axios from "axios";


export default function SignInPage(){
  const [formData, setFormData] = useState({email: "", password: ""});
  const [user, setUser] = useState(null);

  const authenticate = (formData) => {
    axios
      .post("http://localhost:3000/api/auth/login", formData)
      .then((response) => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.token)
        setUser(response.data.token);
        console.log(user)
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(formData)
  };

  useEffect(() => {
    if (user !== null) {
      alert(user);
    }
  }, [user]);

    return(
        <>
        <Navbar/>
        <div className="signin-container">
            <h1>LOGIN</h1>
            <form className="signin-form">
                <input type="text" placeholder="Email" onChange={handleChange} value={formData.email} name ="email"/>
                <input type="password" placeholder="Password" onChange={handleChange} value={formData.password} name ="password"/>
                <button onClick={handleSubmit}>Login</button>
                <p>Don't have an account? <a href="/signup-page">Sign-Up</a></p>
            </form>
        </div>
        {/* <Footer/> */}

        </>
    )
}