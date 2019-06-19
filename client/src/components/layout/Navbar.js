import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
            {/* <a href="index.html"><i className="fas fa-code"></i> DevConnector</a> */}
            <Link to='/'>
                <i className="fas fa-code"/>DevConnector
            </Link>
        </h1>
        <ul>
            <li><a href="!#">Developers</a></li>
            {/* <Link to='/profiles'>
                Profiles
            </Link> */}

          <li>
          {/* <li><a href="register.html">Register</a></li>  */}
            <Link to='/register'>
                Register
            </Link>
        </li>

        <li>
          {/* <li><a href="login.html">Login</a></li>   */}
             <Link to='/login'>
                Login
            </Link>
        </li>
        </ul>  
      </nav>
    )
}

export default Navbar