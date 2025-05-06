import './componentStyling.css'
import React from 'react';
import { Link } from "react-router-dom"

export default function footer(){

    return(
    <div className='footer'>
        <div className='container'>
            <div className='row'>

                {/* column1 */}
                <div className='col'>
                <h3>Fit Trendz</h3>
                <ul>
                    
                </ul>
                </div>
                {/* column2 */}
                <div className='col'>
                    <h4>Fit Trendz</h4>
                <ul>
                <Link to="/">
                    <li class="social">Home</li>
                </Link>
                <Link to="/about"><li class="social">About</li></Link>
                <Link to="/catalog?gender=men"><li class="social">Shop Now</li></Link>
                </ul>
                </div>

                {/* column3 */}
                <div className='col'>
                <h4>Contact</h4>
                <ul>
                    <li>fit.trendz1@gmail.com</li>
                    <Link to="https://www.instagram.com/fit.trendz1/"><li class="social">Instagram</li></Link>
                    <Link to="https://x.com/fittrendz1"><li class="social">Twitter</li></Link>
                    <Link to="https://github.com/nav7FSC/FitTrendz_E-Commerce"><li class="social">Github</li></Link>
                </ul>
                </div>

                {/* column4 */}
                <div className='col'>
                <h3>Join Our News Letter</h3>
               
                </div>
                
            </div>
            <hr />
            <div className='rights'>
                <p className='rights'>
                    &copy; {new Date().getFullYear()} FIT TRENDZ INC |
                </p>
                <p className='rights'> All Rights Reserved | </p>
                <p className='rights'> Terms Of Service </p>
                <p className='rights'> | Privacy</p>

            </div>
        </div>
        </div>
        
   
        
    )

}