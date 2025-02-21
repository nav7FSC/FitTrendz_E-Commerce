import "./Navbar.css"
import { Link } from "react-router-dom"
import searchicon from '../assets/search-icon.png'
import shoppingcart from '../assets/shopping-cart-icon.png'
import personicon from '../assets/person.png'
export default function Navbar(){
    return(
        <>
        
        <nav className="top-nav">
            <div className="search-container">
            <img src={searchicon} className="searchicon" />
            <p>Search</p>
            </div>
            
            <Link to="/check-out" className="Check-Out-container">
                <img src={shoppingcart} className="cart-icon"/>
            <p>Check Out</p>
            </Link>
            
        </nav>
        <nav className="nav">
            <Link to="/womens-page" className="Women">Women</Link>
            <Link to="/mens-page" className="Men">Men</Link>
            <Link to="/" className="Fit-Trendz-Title">Fit Trendz</Link>
            <Link to="/about" className="about">About</Link>

            <Link to="/sign-in" className="Sign-in-Container">
            <img src={personicon} className="person-icon"/>
            <p>Sign in</p>
            </Link>
            
            <Link to="/signup-page" className="Sign-up-Container">
              <p>Sign Up</p>
            </Link>
        </nav>
        </>
    )
}