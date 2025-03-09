import { AiFillStar } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

export default function card({img, title, star, reviews, prevPrice, newPrice}) {
  //TODO fix the star icon to reflect the rating from the db
  return (
    <div>
      <section className="card">
                  <img src={img} alt = {title} className='card-img'>
                  </img>
                  <div className='card-details'>
                      <h3 className='card-title'>{title} </h3>
                      <section className='card-reviews'>
                          <StarRating rating={star}/>
                          <span className='total-reviews'>{reviews}</span>
                      </section>
                      <section className='card-price'>
                          <div className='price'>
                              <del>{prevPrice}</del> {newPrice}
                          </div>
      
                          <div className='bag'>
                          <FaShoppingBag className='bag-icon' />
                          </div>
                      </section>
                  </div>
              </section>
    </div>
  )
}

const StarRating = ({ rating }) => {
  return (
    <div className="ratings-container">
      {Array.from({ length: rating }, (_, index) => (
        <AiFillStar key={index} className="ratings-star" />
      ))}
    </div>
  );
};