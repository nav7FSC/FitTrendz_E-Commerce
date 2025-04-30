import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar";
import "./index.css";
import About from "./pages/about";
import Cart from "./pages/cart";
import {
  default as MenCatalog,
  default as WomenCatalog,
} from "./pages/catalog";
import Checkout from "./pages/check-out";
import ForgotPassword from "./pages/forgotpassword";
import Home from "./pages/home";
import OrderHistory from "./pages/OrderHistory";
import OutfitBuilder from "./pages/OutfitBuilder";
import ProductDetails from "./pages/productdetails";
import Quiz from "./pages/quiz.jsx";
import ResetPassword from "./pages/resetpassword";
import SignIn from "./pages/sign-in";
import SignOutPage from "./pages/sign-out";
import SignUpPage from "./pages/signup-page";
import UserManagementPage from "./pages/userManagement";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/product/:title" element={<ProductDetails />} />
        <Route path="/about" index element={<About />} />
        <Route path="/catalog" index element={<WomenCatalog />} />
        <Route path="/catalog" index element={<MenCatalog />} />
        <Route path="/sign-in" index element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" index element={<Cart />} />
        <Route path="/outfit-builder" element={<OutfitBuilder />} />
        <Route path="/check-out" index element={<Checkout />} />
        <Route path="/signup-page" index element={<SignUpPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/forgotpassword" index element={<ForgotPassword />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
