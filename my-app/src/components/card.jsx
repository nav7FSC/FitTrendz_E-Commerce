import { AiFillStar } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Card({ img, title, star, reviews, prevPrice, newPrice }) {
  return (
    <Link to={`/product/${encodeURIComponent(title)}`} className="card-link">
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            <StarRating rating={star} />
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
              <FaShoppingBag className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </Link>
  );
}

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const starsArray = Array.from({ length: fullStars });

  return (
    <div className="ratings-container">
      {starsArray.map((_, index) => (
        <AiFillStar key={index} className="ratings-star" />
      ))}
    </div>
  );
};
