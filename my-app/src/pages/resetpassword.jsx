import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./pageStyling.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // grab the email passed from the ForgotPassword page (or default to empty)
  const initialEmail = location.state?.email || '';

  const [email, setEmail]     = useState(initialEmail);
  const [code, setCode]       = useState('');
  const [newPass, setNewPass] = useState('');
  const [status, setStatus]   = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
            placeholder="New password"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />
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