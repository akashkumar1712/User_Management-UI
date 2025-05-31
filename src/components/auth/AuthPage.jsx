import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', mobile: '', role: '', city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    isLogin
      ? setLoginData({ ...loginData, [name]: value })
      : setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await UsersService.login(loginData.email, loginData.password);
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
          localStorage.setItem('role', res.role);
          navigate('/dashboard');
        } else {
          alert('Invalid login.');
        }
      } else {
        await UsersService.register(registerData);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert('Authentication error');
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      {/* Left video section */}
      <div className="auth-media">
        <video autoPlay muted loop>
          <source src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay-text">
          <p>Empowering Your Exam Journey</p>
          <p>Learn | Practice | Succeed</p>
        </div>
      </div>

      {/* Right auth form section */}
      <div className="auth-wrapper">
        <div className="auth-container">
          <h2>Welcome To Exam Portal</h2>
          <p className="subtitle">Login or Register to continue</p>

          <div className="auth-toggle">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Register</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input name="name" value={registerData.name} onChange={handleInputChange} placeholder="Name" required />
                <input name="mobile" value={registerData.mobile} onChange={handleInputChange} placeholder="Mobile" required />
                <select name="role" value={registerData.role} onChange={handleInputChange} required>
                  <option value="">Select Role</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <input name="city" value={registerData.city} onChange={handleInputChange} placeholder="City" required />
              </>
            )}
            <input
              type="email"
              name="email"
              value={isLogin ? loginData.email : registerData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={isLogin ? loginData.password : registerData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
