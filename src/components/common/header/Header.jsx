import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Logo from "./Logo";

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Logo />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Exams</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            
          </ul>
          <div className="start">
            <Link to="/register" className="button">
              GET CERTIFICATE
            </Link>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times" /> : <i className="fa fa-bars" />}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
