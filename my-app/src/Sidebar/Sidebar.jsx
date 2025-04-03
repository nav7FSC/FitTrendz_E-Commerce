import './Sidebar.css'
import Category from './Category/Category'
import Price from './Price/Price'
import Colors from './Colors/Colors'
import { FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Sidebar({ handleChange, query, handleInputChange }) {
  return (
    <div>
      <section className="sidebar">
        <div className="search-container2">
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your description"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="log-container">
          <h1><FaShoppingCart /></h1>
        </div>

        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} />
      </section>
    </div>
  );
}
