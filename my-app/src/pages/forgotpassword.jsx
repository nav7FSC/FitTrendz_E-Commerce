import "./pageStyling.css";
import Navbar from "../components/Navbar"
import Footer from "../components/footer";

export default function ForgotPassword(){
    return(
        <>
        <Navbar />
        <div className="forgotpassword-container">
            <div className="forgotpassword-card">
                <form className="forgotpassword-form">
                    <h2>Password assistance</h2>
                    <label>Enter your email address and we will send you a code to reset your password</label>
                    <input type="email" placeholder="E-mail" />
                    <button type="button" className="forgotpassword-button">Send code</button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    )
}