import Navbar from "../components/Navbar"

import "./sign-in.css"

export default function SignInPage(){
    return(
        <>
        <Navbar/>
        <div className="signin-container">
            <h1>LOGIN</h1>
            <form className="signin-form">
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Login</button>
                <p>Don't have an account? <a href="/signup-page">Sign-Up</a></p>
            </form>
        </div>
        {/* <Footer/> */}

        </>
    )
}