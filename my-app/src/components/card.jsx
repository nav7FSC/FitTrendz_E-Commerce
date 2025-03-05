import { AiFillStar } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";

export default function card() {
  return (
    <div>
      <section className="card">
                  <img src="https://m.media-amazon.com/images/I/71E7c09iTdL._AC_SX342_.jpg" alt = "Jacket" className='card-img'>
                  </img>
                  <div className='card-details'>
                      <h3 className='card-title'>Mens Jacket</h3>
                      <section className='card-reviews'>
                          <AiFillStar className='ratings-star' /> <AiFillStar className='ratings-star'/> <AiFillStar className='ratings-star'/> <AiFillStar className='ratings-star'/>
                          <span className='total-reviews'>4</span>
                      </section>
                      <section className='card-price'>
                          <div className='price'>
                              <del>$300</del> 200
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
