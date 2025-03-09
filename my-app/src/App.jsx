import {Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import WomenCatalog from './pages/catalog'
import MenCatalog from './pages/catalog'
import SignIn from './pages/sign-in'
import Checkout from './pages/check-out'
import About from './pages/about'
import SignUpPage from './pages/signup-page';
import Cart from "./pages/cart"; // Import Cart Page
import "./index.css";
import UserManagementPage from "./pages/userManagement";

function App() {
  return (
    <div>

      <Routes>
        <Route path = "/" index element = {<Home />} />
        <Route path = "/about" index element = {<About />} />
        <Route path = "/catalog" index element = {<WomenCatalog />} />
        <Route path = "/catalog" index element = {<MenCatalog />} />
        <Route path = "/sign-in" index element = {<SignIn />} />
        <Route path = "/cart" index element = {<Cart />} />
        <Route path = "/check-out" index element = {<Checkout />} />
        <Route path ="/signup-page" element={<SignUpPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
      </Routes>

    </div>
  )

}

export default App;
