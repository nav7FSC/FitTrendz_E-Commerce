import "./pageStyling.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import googleIcon from "./google-icon.png";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../services/axiosInstance";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

// TODO add protectedRoute from react router so people can't access restricted pages
// TODO implement log out button so the JWT cookie is deleted
// TODO add error messages on invalid login

export default function SignInPage() {
  return (
    <GoogleOAuthProvider clientId="278251322388-ao785r87jmeesbsuloqimmg8il6ctrj9.apps.googleusercontent.com">
      <SignInComponent />
    </GoogleOAuthProvider>
  );
}

function SignInComponent() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loginError, setLoginError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        await login(formData);
        navigate("/");
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setLoginError(err.response.data.error);
        } else {
          setLoginError("An unexpected Error has occurred.")
        }
      }
    }
  };

  // Google Sign-In
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log("Google User Info:", userInfo.data);

        axios
          .post("http://localhost:3000/api/auth/google-login", userInfo.data)
          .then((response) => {
            console.log("Google sign-in success:", response.data);
            alert("Google sign-in successful!");
          })
          .catch((error) => {
            console.error("Google sign-in failed:", error);
            alert("Google sign-in failed.");
          });
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: () => {
      console.error("Google login failed.");
      alert("Google sign-in failed.");
    },
  });

  return (
    <>
      <div className="signin-container">
        <div className="signin-card">
          <form className="signin-form">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.email}
              name="email"
              className={
                touched.email
                  ? errors.email
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
            <span className="error-message">
              {touched.email && errors.email}
            </span>

            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.password}
              name="password"
              className={
                touched.password
                  ? errors.password
                    ? "input-error"
                    : "input-success"
                  : ""
              }
            />
            <span className="error-message">
              {touched.password && errors.password}
            </span>

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="/forgotpassword">Forgot password?</a>
            </div>

            <button onClick={handleSubmit}>Login</button>
            {loginError && <div className="login-error-message">{loginError}</div>}
            {/* Google Login Button */}
            <div className="google-signup" onClick={() => googleLogin()}>
              <img src={googleIcon} alt="Google" />
              Sign in with Google
            </div>

            <div className="signin-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/signup-page">
                  <strong>Sign-Up</strong>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
