import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setApiError('');

    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      } else {
        setApiError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="ieee-sscs-sm-ko-logo2x 1.png" alt="SSCS Logo" className="login-logo" />

        <div className="login-card">
          <h2 className="card-title">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className={`input-field ${emailError ? 'error' : ''}`}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setApiError('');
                }}
                onBlur={() => {
                  if (email && !validateEmail(email)) {
                    setEmailError('Please enter a valid email address');
                  }
                }}
                required
              />
              
            </div>

            <div className="input-group">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`input-field ${passwordError ? 'error' : ''}`}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setPasswordError('');
                  setApiError('');
                }}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            {emailError && <div className="error-message">{emailError}</div>}
            {apiError && <div className="error-message api-error">{apiError}</div>}

            <button type="submit" className="btn-signin">
              Sign In
            </button>
          </form>

          <a href="#" className="forgot-link">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="login-right" />
    </div>
  );
};

export default LoginPage;