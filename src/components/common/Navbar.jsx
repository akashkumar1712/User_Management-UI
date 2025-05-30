import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';
import Logo from "../common/Logo";
//import './Navbar.css'; // Optional: your custom styling

function Navbar() {
  const isAuthenticated = UsersService.isAuthenticated();
  const isAdmin = UsersService.isAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      UsersService.logout();
      navigate('/home'); // Redirect to login page after logout
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/about">Home</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        <li><Link to="/auth">Exam</Link></li> {/* 👈 This is key */}

        {/* {isAuthenticated && <li><Link to="/profile">Profile</Link></li>} */}
        {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
        {/* {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>} */}
      </ul>
    </nav>
  );
}

export default Navbar;
