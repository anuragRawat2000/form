import React from "react";
import "./Navbar.css";
function Navbar() {
  return <div className="navbar">

        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
                <li><a href="/about">About me</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        </nav>

  </div>;
}

export default Navbar;
