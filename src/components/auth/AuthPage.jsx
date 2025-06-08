import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on input change

    if (isLogin) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

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
          setErrors({ general: 'Invalid email or password' });
        }
      } else {
        await UsersService.register(registerData);
        setIsLogin(true);
        setRegisterData({
          name: '',
          email: '',
          password: '',
          mobile: '',
          role: '',
          city: '',
        });
      }
    } catch (err) {
      const responseData = err.response?.data;

      if (responseData?.fieldErrors) {
        setErrors(responseData.fieldErrors);
      } else if (responseData?.message) {
        setErrors({ general: responseData.message });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
        console.error(err);
      }
    }
  };

  const getFieldValue = (field) => (isLogin ? loginData[field] : registerData[field]);

  return (
    <div className="auth-page">
      <div className="auth-media">
        <video autoPlay muted loop>
          <source
            src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay-text" aria-hidden="true">
          <p>Empowering Your Exam Journey</p>
          <p>Learn | Practice | Succeed</p>
        </div>
      </div>

      <div className="auth-wrapper">
        <div className="auth-container">
          <h2>Welcome To Exam Portal</h2>
          <p className="subtitle">Login or Register to continue</p>

          <div className="auth-toggle" role="tablist" aria-label="Authentication toggle">
            <button
              role="tab"
              aria-selected={isLogin}
              aria-controls="login-form"
              id="login-tab"
              className={isLogin ? 'active' : ''}
              onClick={() => {
                setIsLogin(true);
                setErrors({});
              }}
              type="button"
            >
              Login
            </button>
            <button
              role="tab"
              aria-selected={!isLogin}
              aria-controls="register-form"
              id="register-tab"
              className={!isLogin ? 'active' : ''}
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
              type="button"
            >
              Register
            </button>
          </div>

          {errors.general && <p className="error-msg" role="alert">{errors.general}</p>}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            id={isLogin ? 'login-form' : 'register-form'}
            aria-labelledby={isLogin ? 'login-tab' : 'register-tab'}
          >
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                />
                {errors.name && (
                  <p id="error-name" className="error-msg" role="alert">
                    {errors.name}
                  </p>
                )}

                <input
                  type="text"
                  name="mobile"
                  value={registerData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile"
                  required
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? 'error-mobile' : undefined}
                />
                {errors.mobile && (
                  <p id="error-mobile" className="error-msg" role="alert">
                    {errors.mobile}
                  </p>
                )}

                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.role}
                  aria-describedby={errors.role ? 'error-role' : undefined}
                >
                  <option value="">Select Role</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {errors.role && (
                  <p id="error-role" className="error-msg" role="alert">
                    {errors.role}
                  </p>
                )}

                <input
                  type="text"
                  name="city"
                  value={registerData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'error-city' : undefined}
                />
                {errors.city && (
                  <p id="error-city" className="error-msg" role="alert">
                    {errors.city}
                  </p>
                )}
              </>
            )}

            <input
              type="email"
              name="email"
              value={getFieldValue('email')}
              onChange={handleInputChange}
              placeholder="Email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && (
              <p id="error-email" className="error-msg" role="alert">
                {errors.email}
              </p>
            )}

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={getFieldValue('password')}
                onChange={handleInputChange}
                placeholder="Password"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'error-password' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p id="error-password" className="error-msg" role="alert">
                {errors.password}
              </p>
            )}

            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
