import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/MaterialUILogin.styles';
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon } from "../assets/svgicons";
import Spinner from './Spinner';
import MessagePopup from './MessagePopup';

 

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("");
    setIsError(false);
    setEmail("");
    setPassword("");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateCredentials = () => {
    let formErrors = {};

    if (!email) formErrors.email = 'Email is required';
    else if (!validateEmail(email)) formErrors.email = 'Please enter a valid email';

    if (!password) formErrors.password = 'Password is required';
    else if (password.length < 8) formErrors.password = 'Password must be at least 8 characters';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  async function handleLogin () {
    
    if (!validateCredentials()) return;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    setIsLoading(true);
    setMessage("Checking credentials...");
    setShowMessage(true);
    setIsError(false);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || "Invalid credentials");
      }

      // Successful login
      localStorage.setItem("token", data.token);
      setMessage("Login successful! Redirecting...");
      setIsError(false);
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setMessage(err.message || "Authentication failed");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(handleCloseMessage, 5000);
    }
  };

  return (
    <>
      <div style={styles.formContainer}>
        {/* Email Input */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email</label>
          <div style={styles.inputContainer}>
            <EmailIcon />
            <input
              type="email"
              style={{ 
                ...styles.formInput, 
                ...(errors.email ? styles.errorInput : {}) 
              }}
              value={email}
              placeholder="youremail@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {errors.email && <div style={styles.errorText}>{errors.email}</div>}
        </div>

        {/* Password Input */}
        <div style={styles.formGroup}>
          <div style={styles.passwordHeader}>
            <label style={styles.formLabel}>Password</label>
            <span 
              onClick={() => !isLoading && navigate('/forgot-password')} 
              style={styles.forgotPassword}
            >
              Forgot Password?
            </span>
          </div>
          <div style={styles.inputContainer}>
            <LockIcon />
            <input
              type={showPassword ? 'text' : 'password'}
              style={{ 
                ...styles.formInput, 
                ...(errors.password ? styles.errorInput : {}) 
              }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="button" 
              style={styles.passwordToggle} 
              onClick={togglePassword}
              disabled={isLoading}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && <div style={styles.errorText}>{errors.password}</div>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={styles.loginButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Login"}
        </button>
      </div>

      {/* Message Popup */}
      {(showMessage && !isLoading) && <MessagePopup 
        message={message}
        isError={isError}
        show={showMessage}
        onClose={handleCloseMessage}
      />}

      {/* Spinner with credential checking message */}
      {isLoading && <Spinner 
        show={isLoading} 
        text="Verifying your credentials..." 
      />}
    </>
  );
};

export default Login;