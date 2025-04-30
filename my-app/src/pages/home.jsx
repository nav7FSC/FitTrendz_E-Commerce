import { useNavigate } from "react-router-dom";
import women from "../assets/girlmodel1.webp";
import male from "../assets/malemodel1.webp";
import ImageSlider from "../components/ImageSlider";
import "./pageStyling.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <ImageSlider />

      <div className="malesection">
        <p className="menstext">
          Upgrade Your Wardrobe – Fit the Trend, Lead the Way.
        </p>
        <div
          className="modelimg-wrapper"
          onClick={() => navigate("/catalog?category=men")}
        >
          <img src={male} alt="Male Model" className="modelimg" />
          <div className="modelimg-overlay">Shop Men</div>
        </div>
      </div>

      <div className="womensection">
        <div
          className="modelimg-wrapper"
          onClick={() => navigate("/catalog?category=women")}
        >
          <img src={women} alt="Female Model" className="modelimg" />
          <div className="modelimg-overlay">Shop Women</div>
        </div>
        <p className="womentext">
          Own Your Style – Effortless Trends, Endless Confidence.
        </p>
      </div>
    </>
  );
}
