import React, { useState } from 'react';
import styles from '../styling/MaterialUILogin.styles';
import { ShoppingBagIcon } from '../assets/svgicons';
import Login from './Login';
import Signup from './Signup';
import TermsModal from './TermsModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const LoginSignup = () => {
  const [tabValue, setTabValue] = useState(0);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleTabChange = (tabIndex) => {
    setTabValue(tabIndex);
    setErrors({});
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

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button 
            style={{...styles.tab, ...(tabValue === 0 ? styles.activeTab : {})}}
            onClick={() => handleTabChange(0)}
          >
            Login
            {tabValue === 0 && <div style={styles.tabIndicator}></div>}
          </button>
          <button 
            style={{...styles.tab, ...(tabValue === 1 ? styles.activeTab : {})}}
            onClick={() => handleTabChange(1)}
          >
            Create account
            {tabValue === 1 && <div style={styles.tabIndicator}></div>}
          </button>
        </div>

        {/* Login or Signup Form */}
        {tabValue === 0 ? <Login/> : <Signup/>}

        {/* Terms and Privacy Links */}
        <p style={styles.termsText}>
          By continuing, you agree to our{' '}
          <a 
            href="" 
            style={styles.termsLink}
            onClick={(e) => {
              e.preventDefault();
              setShowTerms(true);
            }}
          >
            Terms
          </a>
          {' '}and{' '}
          <a 
            href="" 
            style={styles.termsLink}
            onClick={(e) => {
              e.preventDefault();
              setShowPrivacy(true);
            }}
          >
            Privacy Policy
          </a>.
        </p>
      </div>

      {/* Modals */}
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default LoginSignup;