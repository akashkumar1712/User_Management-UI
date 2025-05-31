import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import About from './components/about/About';
import AuthPage from './components/auth/AuthPage';
import Navbar from './components/common/Navbar';
import ProfilePage from './components/userspage/ProfilePage';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import Contact from './components/contact/Contact';
import Team from './components/team/Team';
import ParentComponent from './components/userspage/ParentComponent';
import StudyMaterialsPage from './components/dashboard/StudyMaterialsPage';
import ExamPage from './components/dashboard/ExamPage';
import ResultPage from './components/dashboard/ResultPage';
import UsersService from './components/service/UsersService';

function Layout() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/auth';
  const isExamRoute = location.pathname.startsWith('/exam');
  const isDashBoard = location.pathname === '/dashboard'
  const shouldHideNavbar = isExamRoute || isAuthRoute || isDashBoard;
  const isAdmin = UsersService.adminOnly();

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className="content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/about" />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<ParentComponent />} />
          <Route path="/materials/:subject/:type" element={<StudyMaterialsPage />} />
          <Route path="/exam/:type/:course" element={<ExamPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin-only routes */}
          {isAdmin ? (
            <>
              <Route path="/admin/user-management" element={<UserManagementPage />} />
              <Route path="/admin/update/:userId" element={<UpdateUser />} />
            </>
          ) : (
            <Route path="/admin/*" element={<Navigate to="/auth" />} />
          )}

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/about" />} />
        </Routes>
      </div>
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
