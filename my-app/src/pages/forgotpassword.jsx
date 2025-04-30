import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pageStyling.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate(); // ← added

  async function handleSendCode() {
    const resp = await fetch("http://localhost:3000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await resp.json();

    if (resp.ok) {
      setStatus({ type: "success", msg: data.message });
      navigate("/resetpassword", { state: { email } });
    } else {
      setStatus({ type: "error", msg: data.error });
    }
  }

  return (
    <>
      <div className="forgotpassword-container">
        <div className="forgotpassword-card">
          <h2>Password Assistance</h2>
          <label>
            Enter your email address and we will send you a code to reset your
            password
          </label>
          <input
            type="email"
            placeholder="E‑mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendCode}>Send code</button>
          {status && <p className={status.type}>{status.msg}</p>}
        </div>
      </div>
    </>
  );
}
