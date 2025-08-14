import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import MessagePopup from './MessagePopup';

const Verify = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage('');
    setIsError(false);
    navigate('/');
  };

  async function verifyEmail() {
    setIsLoading(true);
    setShowMessage(true);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setMessage('Verification token not found.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${BASE_URL}/verify_account?token=${token}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Email verification failed');
      }

      setMessage('Email verified successfully. You can now log in.');
      setIsError(false);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage(error.message || 'Something went wrong. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => navigate('/'), 2000);
    }
  }

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Message Popup */}
      {showMessage && (
        <MessagePopup 
          message={message}
          isError={isError}
          show={showMessage}
          onClose={handleCloseMessage}
        />
      )}

      {/* Spinner Overlay */}
      {isLoading && <Spinner loadingText="Verifying your email..." />}
    </div>
  );
};

export default Verify;