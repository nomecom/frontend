import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginSignup/LoginSignup.css';
import email_icon from "../Assets/email.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const getCurrentDomain = () => window.location.origin;

const handleSendEmail = async () => {
  // Trim and validate email
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    setIsError(true);
    setMessage("Email field cannot be empty.");
    return;
  }

  if (!emailRegex.test(trimmedEmail)) {
    setIsError(true);
    setMessage("Please enter a valid email address.");
    return;
  }
  try {
    const response = await fetch("https://nomapi.onrender.com/api/v1/forgot_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: trimmedEmail})
    });

    const data = await response.json();

    if (!response.ok) {
      setIsError(true);
      setMessage(data.detail || "Something went wrong.");
    } else {
      setIsError(false);
      setEmailSent(true);
      setMessage(`Email sent to ${trimmedEmail}`);
    }
  } catch (error) {
    setIsError(true);
    setMessage("Network error. Please try again.");
  }
};

  // Auto-redirect after 15 seconds if email sent successfully
  useEffect(() => {
    if (emailSent) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [emailSent, navigate]);

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
        {message && (
          <div className={isError ? 'error-found' : 'success-found'}>
            {message}
          </div>
        )}
      </div>

      {!emailSent && (
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="email" />
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="submit-container">
        {!emailSent ? (
          <div className="submit" onClick={handleSendEmail}>
            Send Mail
          </div>
        ) : (
          <div className="submit" onClick={() => navigate('/')}>
            Back to Login
          </div>
        )}
      </div>

      {emailSent && (
        <div className="toggle-container">
          <p>
            Wrong email?{" "}
            <span className="toggle-link" onClick={() => {
              setEmail('');
              setMessage('');
              setEmailSent(false);
            }}>Try again</span>
          </p>
          <p>You will be redirected to Login in 15 seconds...</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
