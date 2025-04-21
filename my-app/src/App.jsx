import "./index.css";
import {Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import WomenCatalog from './pages/catalog'
import MenCatalog from './pages/catalog'
import SignIn from './pages/sign-in'
import Checkout from './pages/check-out'
import About from './pages/about'
import SignUpPage from './pages/signup-page';
import SignOutPage from './pages/sign-out';
import Cart from "./pages/cart"
import Wishlist from './pages/wishlist'
import UserManagementPage from "./pages/userManagement";
import ForgotPassword from "./pages/forgotpassword";
import ProductDetails from "./pages/productdetails";
import Quiz from "./pages/quiz.jsx";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import OutfitBuilder from "./pages/OutfitBuilder";
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path = "/" index element = {<Home />} />
          <Route path="/product/:title" element={<ProductDetails />} />
          <Route path = "/about" index element = {<About />} />
          <Route path = "/catalog" index element = {<WomenCatalog />} />
          <Route path = "/catalog" index element = {<MenCatalog />} />
          <Route path = "/sign-in" index element = {<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path = "/cart" index element = {<Cart />} />
          <Route path="/outfit-builder" element={<OutfitBuilder />} />
          <Route path = "/check-out" index element = {<Checkout />} />
          <Route path = "/signup-page" index element = {<SignUpPage />} />
          <Route path ="/wishlist" element={<Wishlist />} />
          <Route path ="/user-management" element={<UserManagementPage />} />
          <Route path ="/forgotpassword" index element={<ForgotPassword />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/sign-out" element={<SignOutPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      <Footer />
    </div>
  )

}

export default App;
