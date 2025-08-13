import React from 'react';
import '../index.css';

const Spinner = ({ loadingText = "Please wait... processing your data" }) => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <div className="loading-text">{loadingText}</div>
      </div>
    </div>
  );
};

export default Spinner;