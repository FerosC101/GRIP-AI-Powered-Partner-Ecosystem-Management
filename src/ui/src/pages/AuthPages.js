import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './styles/AuthPages.css';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthPages = ({ onLogin, onRegister }) => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      onLogin(loginData);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (registerData.firstName && registerData.email && registerData.password) {
      onRegister(registerData);
    } else {
      alert('Please fill in all fields');
    }
  };

  if (currentPage === 'login') {
    return (
      <div className="auth-root">
        <div className="auth-card">
          {/* Logo and Title */}
          <div className="auth-logo-title">
            <div className="auth-logo-row">
              <div className="auth-logo-img-row">
                <img
                  src="/logo.png"
                  alt="Grip Logo"
                  className="auth-logo-img"
                />
                <span className="auth-logo-text">Grip</span>
              </div>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}></span>
            </div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="auth-form">
            <div>
              <label className="auth-label">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="auth-input"
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="auth-label">Password</label>
              <div className="auth-input-password-row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="auth-input"
                  style={{ paddingRight: '48px' }}
                  onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-input-password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                className="auth-forgot-btn"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              onClick={handleLoginSubmit}
              className="auth-primary-btn"
            >
              Sign In
            </button>

            <div className="auth-link-row">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('register')}
                className="auth-link-btn"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('login')}
          className="auth-back-btn"
        >
          <ArrowLeft size={16} />
          Back to login
        </button>

        {/* Logo and Title */}
        <div className="auth-logo-title">
          <div className="auth-logo-row">
            <div className="auth-logo-img-row">
              <img
                src="/logo.png"
                alt="Grip Logo"
                className="auth-logo-img"
              />
              <span className="auth-logo-text">Grip</span>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}></span>
          </div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us to manage your risks</p>
        </div>

        {/* Register Form */}
        <div className="auth-form">
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="auth-input-wrapper">
              <label className="auth-label">First Name</label>
              <input
                type="text"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                className="auth-input"
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Richnell"
                required
              />
            </div>

            <div className="auth-input-wrapper">
              <label className="auth-label">Last Name</label>
              <input
                type="text"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                className="auth-input"
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Catibog"
                required
              />
            </div>
          </div>

          <div>
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="auth-input"
              onFocus={(e) => e.target.style.borderColor = '#ea580c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="richnellcatibog@example.com"
              required
            />
          </div>

          <div>
            <label className="auth-label">Password</label>
            <div className="auth-input-password-row">
              <input
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="auth-input"
                style={{ paddingRight: '48px' }}
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-input-password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="auth-label">Confirm Password</label>
            <div className="auth-input-password-row">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="auth-input"
                style={{ paddingRight: '48px' }}
                onFocus={(e) => e.target.style.borderColor = '#ea580c'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="auth-input-password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleRegisterSubmit}
            className="auth-primary-btn"
          >
            Create Account
          </button>

          <div className="auth-terms-row">
            By creating an account, you agree to our{' '}
            <button
              type="button"
              className="auth-terms-btn"
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button
              type="button"
              className="auth-terms-btn"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;