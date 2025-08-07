import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../LoginSignup/LoginSignup.css';
import password_icon from "../Assets/password.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get token from URL
  const getTokenFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  };

  
  

  const handleResetPassword = async () => {
    const token = getTokenFromURL();
    
    if (!password || !confirmPassword) {
      setIsError(true);
      setMessage("Both fields are required.");
      return;
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      console.log(token);
      console.log(password);
      
      const response = await fetch('https://nomapi.onrender.com/api/v1/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, new_password : password})
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.detail || "Reset failed.");
      } else {
        setIsError(false);
        setIsSuccess(true);
        setMessage("Password reset successfully.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
        {message && (
          <div className={isError ? 'error-found' : 'success-found'}>
            {message}
          </div>
        )}
      </div>

      {!isSuccess && (
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="password" />
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="confirm-password" />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="submit-container">
        {!isSuccess ? (
          <div className="submit" onClick={handleResetPassword}>
            Reset Password
          </div>
        ) : (
          <div className="submit" onClick={() => navigate('/')}>
            Back to Login
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="toggle-container">
          <p>You will be redirected to Login in 15 seconds...</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;