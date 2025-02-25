import Navbar from "../components/Navbar";
import Footer from "../components/footer";

import ImageSlider from "../components/ImageSlider"; 
import male from "../assets/malemodel1.webp";
import women from "../assets/girlmodel1.webp";

import "./Home.css";

export default function Home() {
    return (
        <>
            <Navbar />
            <ImageSlider />

         
            <div className="malesection">
                <p className="menstext">
                    Upgrade Your Wardrobe – Fit the Trend, Lead the Way.
                </p>
                <img src={male} alt="Male Model" className="modelimg" />
            </div>

            
            <div className="womensection">
                <img src={women} alt="Female Model" className="modelimg" />
                <p className="womentext">
                    Own Your Style – Effortless Trends, Endless Confidence.
                </p>
            </div>
            <Footer />
        </>
    );
}
