import React from 'react';
import { CrossIcon } from '../assets/svgicons';
import styles from '../styling/MaterialUILogin.styles';

const PrivacyPolicyModal = ({ onClose }) => {
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
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Privacy Policy - Nom Ecom</h1>
        
        <h2>1. Information We Collect</h2>
        <p>We collect personal information you provide when creating an account, placing orders, or contacting us. This may include name, email, address, and payment information.</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use your information to process orders, improve our services, communicate with you, and prevent fraud. We may use your email to send promotional offers unless you opt-out.</p>
        
        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share data with trusted third parties who assist in operating our website, conducting business, or servicing you.</p>
        
        <h2>4. Data Security</h2>
        <p>We implement security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        
        <h2>5. Cookies</h2>
        <p>We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can disable cookies in your browser settings.</p>
        
        <h2>6. Children's Privacy</h2>
        <p>Our services are not directed to individuals under 16. We do not knowingly collect personal information from children.</p>
        
        <h2>7. Your Rights</h2>
        <p>You may access, correct, or delete your personal information through your account settings or by contacting us. You may opt-out of marketing communications at any time.</p>
        
        <h2>8. Changes to This Policy</h2>
        <p>We may update this policy periodically. We will notify you of significant changes through email or a notice on our website.</p>
        
        <p style={{ marginTop: '30px', fontStyle: 'italic' }}>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;