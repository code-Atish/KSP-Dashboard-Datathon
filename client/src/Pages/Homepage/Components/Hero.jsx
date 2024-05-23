import React from "react"
import { Link } from 'react-router-dom';

import hero from '../assets/hero.jpg';
const HeroSection = () => {
    return (
        <main className="hero container">
            <div className="hero-content">
                <h1>
                Karnataka State Police
                </h1>
                <p>Welcome to the Karnataka State Police Dashboard. Access real-time data and insights to enhance police performance and optimize resource management. Track key performance indicators and monitor duty allocation for effective law enforcement.</p>

                <div className="hero-btn">
                <Link to="/login"><button>Get Started</button></Link>
                </div>
               
            </div>

            <div className="hero-image">
            <img src={hero} alt="hero-image" /> 
            </div>

        </main>
    )
}

export default HeroSection