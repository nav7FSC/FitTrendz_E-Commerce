import './navbar.css'
import { Link } from "react-router-dom"
import searchicon from '../assets/search-icon.png'
import shoppingcart from '../assets/shopping-cart-icon.png'
import personicon from '../assets/person.png'

export default function Navbar() {
    return (
        <div className='navbar'>
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="search-container">
                    <img src={searchicon} className="searchicon" alt="Search Icon" />
                    <p>Search</p>
                </div>

                {/* View Cart + Sign in Underneath */}
                <div className="sign-in-cart-container">
                    <Link to="/cart" className="Check-Out-container">
                        <img src={shoppingcart} className="cart-icon" alt="Shopping Cart" />
                        <p>View Cart</p>
                    </Link>

                    <Link to="/sign-in" className="Sign-in-Container">
                        <img src={personicon} className="person-icon" alt="User Icon" />
                        <p>Sign in / Sign up</p>
                    </Link>
                </div>
            </nav>

            {/* Main Navigation */}
            <nav className="nav">
                <Link to="/catalog">Women</Link>
                <Link to="/catalog">Men</Link>
                <Link to="/about">About</Link>
                <Link to="/" className="Fit-Trendz-Title">
                    <span>Fit Trendz</span>
                </Link>   
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/user-management">User Management</Link>
            </nav>
        </div>
    );
}