import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Navigation = () => {
  return (
    <div>
      <nav className="container">
        <div className="logo">
          <img src={logo} alt="logo" /> {/* Replace with actual logo path */}
        </div>
        <ul>
             <li href="#">Location</li>
             <li href="#">About</li>
             <li href="#">Contact</li>
        </ul>
        <Link to="/login"><button>Login</button></Link>
      </nav>
    </div>
  );
}

export default Navigation;
