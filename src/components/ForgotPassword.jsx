import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/MaterialUILogin.styles';
import { EmailIcon, ShoppingBagIcon, CrossIcon } from "../assets/svgicons";
import Spinner from './Spinner';
import MessagePopup from './MessagePopup';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
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
    navigate("/")
  };


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const finalValidation = () => {
    let formErrors = {};

    if (!email) formErrors.email = 'Email is required';
    else if (!validateEmail(email)) formErrors.email = 'Please enter a valid email';
    setErrors(formErrors);
    return formErrors;
  };

  async function handleSendEmail() {

    const validationErrors = finalValidation();
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}/forgot_password`; 
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email})
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setMessage(data.details || "Invalid email or email not registered");
        setIsError(true);
      } else {
        setMessage("Email sent successfully. Redirecting...");
        setIsError(false);
        if (data.token) localStorage.setItem("token", data.token);

        setTimeout(() => navigate("/"), 2000);
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
    <div style={styles.container}>
      <div style={styles.paper}>
        {/* Logo and Brand */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <ShoppingBagIcon />
          </div>
          <h1 style={styles.brandName}>Nom Ecom</h1>
        </div>

        <div style={styles.formContainer}>
        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email</label>
          <div style={styles.inputContainer}>
            <EmailIcon />
            <input
              type="email"
              style={{ ...styles.formInput, ...(errors.email ? styles.errorInput : {}) }}
              value={email}
              placeholder="youremail@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <div style={styles.errorText}>{errors.email}</div>}
        </div>
        <span onClick={() => navigate('/')} style={styles.backToLogin}>Back to Login</span>
        {/* Login Button */}
        <button
          onClick={handleSendEmail}
          type="submit"
          style={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Send Email"}
        </button>
      </div>

      {/* Message Overlay */}
      {(showMessage && !isLoading) && (
        <MessagePopup 
          message={message}
          isError={isError}
          onClose={handleCloseMessage}
        />
      )}

      {/* Spinner Overlay */}
      {isLoading && <Spinner  loadingText = "Sending reset link..."/>}
      </div>
    </div>
  );
};

export default ForgotPassword;
