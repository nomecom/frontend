import React, { useState, useEffect } from "react";
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon, CrossIcon, PhoneIcon } from "../assets/svgicons";
import styles from '../styling/MaterialUILogin.styles';
import Spinner from "./Spinner";
import MessagePopup from "./MessagePopup";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setPasswordValidation({
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    });
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("");
    setIsError(false);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
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

  const finalValidation = () => {
    let formErrors = {};

    if (!fullName) formErrors.fullName = 'Full name is required';
    else if (!validateName(fullName)) formErrors.fullName = 'Name should contain only letters';
  
    if (!email) formErrors.email = 'Email is required';
    else if (!validateEmail(email)) formErrors.email = 'Please enter a valid email';

    if (!phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
    else if (!validatePhoneNumber(phoneNumber)) formErrors.phoneNumber = 'Please enter a valid phone number';
  
    if (!password) formErrors.password = 'Password is required';
    else if (!validatePassword(password)) formErrors.password = 'Password does not meet requirements';

    return formErrors;
  };

  useEffect(() => {
    if (password) {
      validatePassword(password);
    }
  }, [password]);

  async function handleCreateAccount() {

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const validationErrors = finalValidation();
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    console.log(window.location.origin)
    const url = `${BASE_URL}/user`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        phone: phoneNumber,
        domain: window.location.origin
      })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setIsLoading(false);
      
      if (!response.ok) {
        setMessage(data.details || "Something went wrong");
        setIsError(true);
      } else {
        setMessage("Sign up successful. Please check your email to verify your account.");
        setIsError(false);
        clearForm();
      }
      setShowMessage(true);
      setTimeout(handleCloseMessage, 5000);
    } catch (err) {
      setIsLoading(false);
      setMessage("Network error. Please try again.");
      setIsError(true);
      setShowMessage(true);
      setTimeout(handleCloseMessage, 5000);
    }
  };

  return (
    <>
      <div style={styles.formContainer}>
        {/* Full Name Input */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Full Name</label>
          <div style={styles.inputContainer}>
            <EmailIcon />
            <input
              type="text"
              style={styles.formInput}
              value={fullName}
              placeholder="John Wick"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        {/* Email Input */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email</label>
          <div style={styles.inputContainer}>
            <EmailIcon />
            <input
              type="email"
              style={styles.formInput}
              value={email}
              placeholder="youremail@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Phone Number Input */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Phone Number (India)</label>
          <div style={styles.inputContainer}>
            <PhoneIcon/>
            <input
              type="tel"
              style={styles.formInput}
              value={phoneNumber}
              placeholder="9876543210"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhoneNumber(value);
              }}
            />
          </div>
        </div>

        {/* Password Input */}
        <div style={styles.formGroup}>
          <div style={styles.passwordHeader}>
            <label style={styles.formLabel}>Password</label>
          </div>
          <div style={styles.inputContainer}>
            <LockIcon />
            <input
              type={showPassword ? "text" : "password"}
              style={styles.formInput}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              style={styles.passwordToggle}
              onClick={togglePassword}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Password validation rules */}
          {password && (
            <div style={styles.validationRules}>
              {Object.entries(passwordValidation).map(([key, isValid]) => (
                <div key={key} style={styles.validationRule}>
                  {isValid ? <CheckIcon /> : <CrossIcon />}
                  <span style={{ color: isValid ? "#10b981" : "#6b7280" }}>
                    {key === 'minLength' && 'At least 8 characters'}
                    {key === 'hasUpperCase' && 'At least one uppercase letter'}
                    {key === 'hasLowerCase' && 'At least one lowercase letter'}
                    {key === 'hasNumber' && 'At least one number'}
                    {key === 'hasSpecialChar' && 'At least one special character'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          style={styles.loginButton}
          onClick={handleCreateAccount}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Create Account"}
        </button>
      </div>

      {/* Message overlay and popup */}
      {(showMessage && !isLoading) && (
        <MessagePopup 
          message={message}
          isError={isError}
          onClose={handleCloseMessage}
        />
      )}

      {/* Spinner overlay */}
      {isLoading && <Spinner />}
    </>
  );
};

export default Signup;