import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "../db/data";
import "./product-details.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Card from "../components/card"; // NEW

export default function ProductDetails() {
  const { title } = useParams();
  const product = data.find((item) => item.title === decodeURIComponent(title));
  const [selectedSize, setSelectedSize] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    gender: "",
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const getSize = () => {
    const { gender, chest, waist, hips } = answers;
    const c = parseInt(chest);
    const w = parseInt(waist);
    const h = parseInt(hips);

    if (gender === "female") {
      if (c <= 33 && w <= 26 && h <= 36) return "S";
      if (c <= 36 && w <= 29 && h <= 39) return "M";
      if (c <= 39 && w <= 32 && h <= 42) return "L";
      return "XL";
    } else {
      if (c <= 36 && w <= 30) return "S";
      if (c <= 40 && w <= 34) return "M";
      if (c <= 44 && w <= 38) return "L";
      return "XL";
    }
  };

  const handleUseSuggestedSize = () => {
    setSelectedSize(getSize());
  };

  const questions = [
    {
      label: "What's your gender?",
      name: "gender",
      type: "select",
      options: ["male", "female"],
    },
    { label: "What's your height (inches)?", name: "height", type: "number" },
    { label: "What's your weight (lbs)?", name: "weight", type: "number" },
    {
      label: "What's your chest measurement (inches)?",
      name: "chest",
      type: "number",
    },
    {
      label: "What's your waist measurement (inches)?",
      name: "waist",
      type: "number",
    },
    {
      label: "What's your hips measurement (inches)?",
      name: "hips",
      type: "number",
    },
  ];
  const currentQuestion = questions[step];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product, selectedSize);
    alert(`✅ ${product.title} (Size ${selectedSize}) added to cart!`);
    navigate("/cart");
  };

  const handleWishlist = () => {
    setWishlisted(true);
    addToWishlist({
      ...product,
      id: product.title,
      price: parseFloat(product.newPrice.replace("$", "")),
      img: product.img,
    });
    alert(`❤️ ${product.title} added to wishlist!`);
  };

  const getRecommended = (currentTitle, category) => {
    return data
      .filter((item) => item.title !== currentTitle && item.category === category)
      .slice(0, 4);
  };

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="product-details">
        <div className="image-section">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="info-section">
          <h1>{product.title}</h1>
          <p><strong>Rating:</strong> {product.rating} {product.reviews}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Style:</strong> {product.style}</p>
          <p className="price">
            <span className="prev">{product.prevPrice}</span>
            <span className="new">{product.newPrice}</span>
          </p>

          <label htmlFor="size-select"><strong>Select Size:</strong></label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="size-dropdown"
          >
            <option value="">-- Choose a size --</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <div className="button-row">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-btn ${wishlisted ? "added" : ""}`}
              onClick={handleWishlist}
              disabled={wishlisted}
            >
              {wishlisted ? "Wishlisted ❤️" : "Add to Wishlist"}
            </button>
            <button className="outfit-builder-link" onClick={() => navigate("/outfit-builder")}>
              Build Outfit with This
            </button>
          </div>

          <div className="quiz-container">
            <h2 className="quiz-title">Not sure your size?</h2>
            {step < questions.length ? (
              <>
                <p>{currentQuestion.label}</p>
                {currentQuestion.type === "select" ? (
                  <select
                    name={currentQuestion.name}
                    value={answers[currentQuestion.name]}
                    onChange={handleChange}
                    className="quiz-input"
                  >
                    <option value="">Select</option>
                    {currentQuestion.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={currentQuestion.type}
                    name={currentQuestion.name}
                    value={answers[currentQuestion.name]}
                    onChange={handleChange}
                    className="quiz-input"
                  />
                )}
                <div style={{ marginTop: "20px" }}>
                  {step > 0 && (
                    <button onClick={back} className="quiz-button" style={{ marginRight: "10px" }}>
                      Back
                    </button>
                  )}
                  <button onClick={next} className="quiz-button">Next</button>
                </div>
              </>
            ) : (
              <>
                <h3>Your Recommended Size:</h3>
                <p className="quiz-result">{getSize()}</p>
                <button onClick={handleUseSuggestedSize} className="quiz-button">
                  Use This Size
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="recommended-section">
        <h2>You May Also Like</h2>
        <div className="recommended-grid">
          {getRecommended(product.title, product.category).map((item) => (
            <Card
              key={item.title}
              img={item.img}
              title={item.title}
              star={item.rating}
              reviews={item.reviews}
              prevPrice={item.prevPrice}
              newPrice={item.newPrice}
            />
          ))}
        </div>
      </div>
    </>
  );
}
