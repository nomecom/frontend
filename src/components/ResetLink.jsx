import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styling/MaterialUILogin.styles';
import { LockIcon, EyeIcon, EyeOffIcon, ShoppingBagIcon, CheckIcon, CrossIcon } from "../assets/svgicons";
import Spinner from './Spinner';
import MessagePopup from './MessagePopup';

const ResetLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State declarations
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions
  const getTokenFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("");
    setIsError(false);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordValidation(validations);
    return Object.values(validations).every(Boolean);
  };

  const validateForm = () => {
    let isValid = true;

    if (!password || !confirmPassword) {
      setMessage("Both fields are required");
      setIsError(true);
      isValid = false;
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      isValid = false;
    } else if (!validatePassword(password)) {
      setMessage("Password does not meet requirements");
      setIsError(true);
      isValid = false;
    }

    if (!isValid) {
      setShowMessage(true);
      setTimeout(handleCloseMessage, 5000);
    }

    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    setIsLoading(true);
    setMessage("Updating your password...");
    setShowMessage(true);
    setIsError(false);

    try {
      const token = getTokenFromURL();
      const response = await fetch(`${BASE_URL}/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          token, 
          new_password: password 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to reset password");
      }

      setMessage("Password changed successfully! Redirecting to login...");
      setIsError(false);
      setTimeout(() => navigate('/login'), 3000);

    } catch (err) {
      setMessage(err.message || "Password not changed. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(handleCloseMessage, 5000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.paper}>
        {/* Logo Section */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <ShoppingBagIcon />
          </div>
          <h1 style={styles.brandName}>Nom Ecom</h1>
        </div>

        {/* Form Section */}
        <div style={styles.formContainer}>
          {/* Password Input */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>New Password</label>
            <div style={styles.inputContainer}>
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                style={styles.formInput}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
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

            {/* Password validation rules */}
            {password && (
              <div style={styles.validationRules}>
                <div style={styles.validationRule}>
                  {passwordValidation.minLength ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: passwordValidation.minLength ? "#10b981" : "#6b7280" }}>
                    At least 8 characters
                  </span>
                </div>
                <div style={styles.validationRule}>
                  {passwordValidation.hasUpperCase ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: passwordValidation.hasUpperCase ? "#10b981" : "#6b7280" }}>
                    At least one uppercase letter
                  </span>
                </div>
                <div style={styles.validationRule}>
                  {passwordValidation.hasLowerCase ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: passwordValidation.hasLowerCase ? "#10b981" : "#6b7280" }}>
                    At least one lowercase letter
                  </span>
                </div>
                <div style={styles.validationRule}>
                  {passwordValidation.hasNumber ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: passwordValidation.hasNumber ? "#10b981" : "#6b7280" }}>
                    At least one number
                  </span>
                </div>
                <div style={styles.validationRule}>
                  {passwordValidation.hasSpecialChar ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: passwordValidation.hasSpecialChar ? "#10b981" : "#6b7280" }}>
                    At least one special character
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Confirm Password</label>
            <div style={styles.inputContainer}>
              <LockIcon />
              <input
                type={showConfirmPassword ? "text" : "password"}
                style={styles.formInput}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={toggleConfirmPassword}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            style={styles.loginButton}
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </div>

        {/* Message Popup */}
        {(showMessage && !isLoading) && (
          <MessagePopup 
            message={message}
            isError={isError}
            show={showMessage}
            onClose={handleCloseMessage}
          />
        )}

        {/* Spinner */}
        {isLoading && (
          <Spinner 
            show={isLoading} 
            text="Updating your password..." 
          />
        )}
      </div>
    </div>
  );
};

export default ResetLink;