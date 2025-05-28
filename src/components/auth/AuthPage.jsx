import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService'; // ⬅️ Import this
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); // ⬅️ Hook

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        //console.log("Reached request");
        // Correct argument usage
        const data = await UsersService.login(loginData.email, loginData.password);
        if (!data) {
          alert('Login failed: token missing');
          return;
        }
        //console.log("Reached response");
        //const token = response.token;
        //const role = response.role; // if backend returns this
  
        localStorage.setItem('token', data.token);
        if (data.role) localStorage.setItem('role', data.role); // optional
        navigate('/profile');
      } else {
        // Registration requires a token if your backend needs it (ADMIN maybe?)
        //const adminToken = localStorage.getItem('token') || ''; // or skip if not needed
        // const response = await UsersService.register(registerData);
        await UsersService.register(registerData);
        
        //const role = response.role;
  
        //localStorage.setItem('token', token);
        alert('Registration successful! Please log in.');
        setIsLogin(true); // ⬅️ This shows the login form
        
        //if (role) localStorage.setItem('role', role);
        //navigate('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please check credentials.');
    }


  //   try {
  //     const response = await UsersService.login(loginData.email, loginData.password);
  //     console.log("Login response:", response); // DEBUG THIS
    
  //     const token = response.token;
  //     if (!token) {
  //       alert("Login failed: Token missing");
  //       return;
  //     }
    
  //     localStorage.setItem('token', token);
  //     navigate('/profile');
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     alert("Login failed. Check credentials.");
  //   }
    
  };

  

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2 style={{ textAlign: "center", color: "green" }}>Welcome To Exam Portal</h2>

        <div className="auth-toggle">
          <button type="button" className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button type="button" className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Register
          </button>
        </div>

        <div className={`form-slider ${isLogin ? 'slide-login' : 'slide-register'}`}>
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input type="text" placeholder="Name" name="name" value={registerData.name} onChange={handleInputChange} required />
                <input type="text" placeholder="Mobile" name="mobile" value={registerData.mobile} onChange={handleInputChange} required />
                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {/* <input type="text" placeholder="Role" name="role" value={registerData.role} onChange={handleInputChange} required /> */}
                <input type="text" placeholder="City" name="city" value={registerData.city} onChange={handleInputChange} required />
              </>
            )}

            <input type="email" placeholder="youremail@email.com" name="email" value={isLogin ? loginData.email : registerData.email} onChange={handleInputChange} required />
            <input type="password" placeholder="password" name="password" value={isLogin ? loginData.password : registerData.password} onChange={handleInputChange} required />
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
