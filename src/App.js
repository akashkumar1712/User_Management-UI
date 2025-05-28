import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from './components/about/About';
import AuthPage from './components/auth/AuthPage';
//import FooterComponent from './components/common/Footer';
import Navbar from './components/common/Navbar';
import UsersService from './components/service/UsersService';
import ProfilePage from './components/userspage/ProfilePage';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
// Add your missing pages
//import Contact from './components/Contact';
import Contact from './components/contact/Contact';
import Team from './components/team/Team';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/auth', '/exam'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* <Header /> */}
      {!shouldHideNavbar && <Navbar />}
      <div className="content">
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/exam" element={<AuthPage />} /> {/* All exams will show login */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfilePage />} />
          {UsersService.adminOnly() && (
            <>
              <Route path="/admin/user-management" element={<UserManagementPage />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {/* <FooterComponent /> */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
