import React from 'react';
import { CrossIcon } from '../assets/svgicons';
import styles from '../styling/MaterialUILogin.styles';

const TermsModal = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      zIndex: 2000,
      padding: '20px',
      overflowY: 'auto'
    }}>
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <CrossIcon />
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Terms of Service - Nom Ecom</h1>
        
        <h2>1. Introduction</h2>
        <p>Welcome to Nom Ecom! These Terms of Service govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.</p>
        
        <h2>2. Account Registration</h2>
        <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
        
        <h2>3. Product Information</h2>
        <p>We strive for accuracy in product descriptions and pricing but cannot guarantee that all information is error-free. We reserve the right to correct any errors.</p>
        
        <h2>4. Orders and Payments</h2>
        <p>All orders are subject to product availability. We accept various payment methods as indicated on our website. You agree to pay all charges incurred by your account.</p>
        
        <h2>5. Returns and Refunds</h2>
        <p>Our return policy allows for returns within 30 days of purchase. Items must be in original condition with all tags attached. Refunds will be processed to the original payment method.</p>
        
        <h2>6. Intellectual Property</h2>
        <p>All content on this website, including text, graphics, logos, and images, is the property of Nom Ecom and protected by intellectual property laws.</p>
        
        <h2>7. Limitation of Liability</h2>
        <p>Nom Ecom shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
        
        <h2>8. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of [Your Country/State].</p>
        
        <p style={{ marginTop: '30px', fontStyle: 'italic' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TermsModal;