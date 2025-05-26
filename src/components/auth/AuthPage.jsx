import React, { useState } from 'react';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with", loginData);
    } else {
      console.log("Registering with", registerData);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2 style={{ textAlign: "center", color: "green" }}>Welcome To Exam Portal</h2>

        <div className="auth-toggle">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className={`form-slider ${isLogin ? 'slide-login' : 'slide-register'}`}>
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={registerData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={registerData.mobile}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  name="role"
                  value={registerData.role}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={registerData.city}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="youremail@email.com"
              name="email"
              value={isLogin ? loginData.email : registerData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={isLogin ? loginData.password : registerData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
