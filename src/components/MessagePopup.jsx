import React from 'react';
import { CrossIcon } from "../assets/svgicons";
import '../index.css';

const MessagePopup = ({ message, isError, onClose }) => {
  return (
    <>
      <div className="message-overlay" onClick={onClose} />
      <div className={isError ? "message-popup error" : "message-popup"}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="message-close-button"
        >
          <CrossIcon />
        </button>
      </div>
    </>
  );
};

export default MessagePopup;