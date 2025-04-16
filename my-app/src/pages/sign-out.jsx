import "./pageStyling.css";
import { useAuth } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useEffect, useRef } from "react";

export default function SignOutPage() {
  const { logout, accessToken } = useAuth();
  const wasLoggedInAtMount = useRef(!!accessToken);
  useEffect(() => {
    if (wasLoggedInAtMount.current) {
      logout();
    }
  }, []);

  return (
    <>
      <div className="signout-container">
        <div className="signout-card">
          <h1>
            {wasLoggedInAtMount.current
              ? "Logged out Successfully!"
              : "You were not logged in."}
          </h1>
        </div>
      </div>
    </>
  );
}
