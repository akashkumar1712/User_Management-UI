import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthPage from './components/auth/AuthPage';
import FooterComponent from './components/common/Footer';
import Header from './components/common/header/Header';
import Navbar from './components/common/Navbar';
import UsersService from './components/service/UsersService';
import ProfilePage from './components/userspage/ProfilePage';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';

import About from './components/about/About';


function App() {
  return (

  
    <BrowserRouter>

        <Header />
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/about" element={<About />} />
          {/* <Route exact path="/exam" element={<AllExam />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/contact" element={<Contact />} /> */}
          
        </Routes>
        <FooterComponent />



      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />

            {/* Optional: redirect old login/register paths to /auth */}
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/register" element={<Navigate to="/auth" replace />} />

            <Route path="/profile" element={<ProfilePage />} />

            {UsersService.adminOnly() && (
              <>
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}

            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
