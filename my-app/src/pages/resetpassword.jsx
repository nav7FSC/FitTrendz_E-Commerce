import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./pageStyling.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // grab the email passed from the ForgotPassword page (or default to empty)
  const [errors, setErrors] = useState({});
  const initialEmail = location.state?.email || '';
  const [touched, setTouched] = useState({ password: false });
  const [email, setEmail]     = useState(initialEmail);
  const [code, setCode]       = useState('');
  const [newPass, setNewPass] = useState('');
  const [status, setStatus]   = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validate(name, value);
  };
  async function handleReset() {
    const resp = await fetch('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, newPassword: newPass })
    });
    const data = await resp.json();

    if (resp.ok) {
      setStatus({ type: 'success', msg: data.message });
      // after a brief pause, redirect to sign-in
      setTimeout(() => navigate('/sign-in'), 1500);
    } else {
      setStatus({ type: 'error', msg: data.error });
    }
  }

  return (
    <>
      <div className="resetpassword-container">
        <div className="resetpassword-card">
          <h2>Reset Your Password</h2>
          <input
            type="email"
            placeholder="E‑mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Reset code"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}  // ← dynamic type
            name="password"
            placeholder="New password"
            value={newPass}
            onChange={e => {
              setNewPass(e.target.value)
              if (touched[name]) {
                validate(name, e.target.value);
              }}
            }
            onBlur={handleBlur}
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

          <div className="showpassword-container">
          <label className="showpassword-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(prev => !prev)}
            />{' '}
            <p>Show password</p>
          </label>
          </div>
          
          <button onClick={handleReset}>
            Reset Password
          </button>
          {status && (
            <p className={status.type}>{status.msg}</p>
          )}
        </div>
      </div>
    </>
  );
}