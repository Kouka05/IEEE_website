import React, { useState } from 'react';
import axios from 'axios';
import '../LoginPage/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    role: '',
    department: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNo.trim()) newErrors.phoneNo = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', formData);
      console.log('Signup successful:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      // Automatically log in and redirect
      if (response.data.user) {
        login(response.data.user);
      }
      navigate('/');
    } 
    catch (err) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || 'Signup failed. Please try again.');
      } else {
        setApiError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/">
        <img src="ieee-sscs-sm-ko-logo2x 1.png" alt="SSCS Logo" className="login-logo" />
        </Link>
        <div className="login-card">
          <h2 className="card-title">Sign Up to IEEE</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className={`input-field ${errors.name ? 'error' : ''}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
            
            <input
              type="email"
              placeholder="Email Address"
              className={`input-field ${errors.email ? 'error' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            
            <input
              type="tel"
              placeholder="WhatsApp Number"
              className={`input-field ${errors.phoneNo ? 'error' : ''}`}
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
            {errors.phoneNo && <div className="error-message">{errors.phoneNo}</div>}
            
            <input
              type="password"
              placeholder="Password"
              className={`input-field ${errors.password ? 'error' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
            
            <select
              className={`input-field ${errors.role ? 'error' : ''}`}
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Role</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Chairman">Chairman</option>
              <option value="Head">Head</option>
            </select>
            {errors.role && <div className="error-message">{errors.role}</div>}
            
            <input
              type="text"
              placeholder="Department"
              className={`input-field ${errors.department ? 'error' : ''}`}
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            {errors.department && <div className="error-message">{errors.department}</div>}
            
            {apiError && <div className="error-message api-error">{apiError}</div>}
            
            <button type="submit" className="btn-signin">
              Continue
            </button>
          </form>
          
          <div className="links-container">
            <a href="/login" className="signup-link">
              Already Have an Account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
