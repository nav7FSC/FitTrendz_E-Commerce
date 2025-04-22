import './navbar.css'
import { Link } from "react-router-dom"
import shoppingcart from '../assets/shopping-cart-icon.png'
import personicon from '../assets/person.png'
import { useAuth } from './AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { accessToken } = useAuth()
    const { cartItems } = useCart()

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div className='navbar'>
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="left-nav">
                    <Link to="/cart" className="Check-Out-container cart-icon-wrapper">
                        <img src={shoppingcart} className="cart-icon" alt="Shopping Cart" />
                        {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
                        <p>View Cart</p>
                    </Link>
                </div>
                <div className="right-nav">
                    {!accessToken ? (
                        <Link to="/sign-in" className="Sign-in-Container">
                            <img src={personicon} className="person-icon" alt="User Icon" />
                            <p>Sign in</p>
                        </Link>
                    ) : (
                        <Link to="/sign-out" className="Sign-out-Container">
                            <img src={personicon} className="person-icon" alt="User Icon" />
                            <p>Sign out</p>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Main Navigation */}
            <nav className="nav">
                <Link to="/catalog?gender=women">Women</Link>
                <Link to="/catalog?gender=men">Men</Link>
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
