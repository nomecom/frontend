import react from 'react';
import styles from '../styling/MaterialUILogin.styles';


  export const ShoppingBagIcon = () => (
    <svg style={{ width: '20px', height: '20px', fill: 'white' }} viewBox="0 0 24 24">
      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
    </svg>
  );

  export const EmailIcon = () => (
    <svg style={styles.inputIcon} viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  export const LockIcon = () => (
    <svg style={styles.inputIcon} viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="m7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  export const EyeIcon = () => (
    <svg
      style={{ width: "20px", height: "20px", fill: "#9ca3af" }}
      viewBox="0 0 24 24"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  export const EyeOffIcon = () => (
    <svg
      style={{ width: "20px", height: "20px", fill: "#9ca3af" }}
      viewBox="0 0 24 24"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  export const CheckIcon = () => (
    <svg
      style={{ width: "16px", height: "16px", fill: "#10b981" }}
      viewBox="0 0 24 24"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );

  export const CrossIcon = () => (
    <svg
      style={{ width: "16px", height: "16px", fill: "#ef4444" }}
      viewBox="0 0 24 24"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  );

  export const PhoneIcon = () => (
  <svg
    style={{ ...styles.inputIcon, fill: "#9ca3af" }}
    viewBox="0 0 24 24"
  >
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.55.57 1 1 0 011 1v3.49a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.49a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.21 1.11l-2.23 2.13z" />
  </svg>
);
