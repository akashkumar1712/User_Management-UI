import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
import Logo from "../Logo";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = UsersService.isAuthenticated();
  const isAdmin = UsersService.isAdmin();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UsersService.logout();
      navigate("/auth");
    }
  };

  return (
    <>
      <Logo />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Exams</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
            {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            )}
          </ul>

          <div className="start">
            <Link to={isAuthenticated ? "/profile" : "/register"} className="button">
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
