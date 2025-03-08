import './Sidebar.css'
import Category from './Category/Category'
import Price from './Price/Price'
import Colors from './Colors/Colors'
import { FaShoppingCart } from "react-icons/fa";

export default function Sidebar({handleChange}) {
  console.log(handleChange);
  return (
    <div>
      <section className="sidebar">
        <div className="log-container">
           <h1><FaShoppingCart /></h1> 
        </div>

        <Category handleChange ={handleChange} />
        <Price handleChange ={handleChange} />
        <Colors handleChange ={handleChange} />

      </section>
    </div>
  )
}
