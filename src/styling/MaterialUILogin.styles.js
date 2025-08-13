const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '32px'
    },
    logoIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: '#3b82f6',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    brandName: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    tabsContainer: {
      display: 'flex',
      marginBottom: '32px',
      borderBottom: '1px solid #e5e7eb',
      position: 'relative'
    },
    tab: {
      flex: 1,
      padding: '16px 0',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      position: 'relative',
      transition: 'color 0.2s'
    },
    activeTab: {
      color: '#1f2937'
    },
    tabIndicator: {
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '3px',
      backgroundColor: '#3b82f6',
      borderRadius: '3px 3px 0 0'
    },
    formContainer: {
      flexGrow: 1
    },
    formGroup: {
      marginBottom: '20px'
    },
    formLabel: {
      display: 'block',
      color: '#374151',
      fontWeight: '500',
      fontSize: '14px',
      marginBottom: '8px'
    },
    passwordHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    forgotPassword: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '400',
      cursor: 'pointer',
    },
    backToLogin: {
      color: '#3b82f6',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '400'
    },
    inputContainer: {
      position: 'relative'
    },
    formInput: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '44px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s',
      outline: 'none',
      boxSizing: 'border-box'
    },
    errorInput: {
      borderColor: '#ef4444 !important'
    },
    inputIcon: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      fill: '#9ca3af'
    },
    passwordToggle: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '2px'
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '16px',
      marginBottom: '24px',
      transition: 'background-color 0.2s'
    },
    dividerContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#e5e7eb'
    },
    dividerText: {
      padding: '0 16px',
      color: '#9ca3af',
      fontSize: '14px'
    },
    socialButtons: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px'
    },
    socialButton: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white',
      color: '#374151',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    },
    socialIcon: {
      width: '20px',
      height: '20px'
    },
    termsText: {
      color: '#6b7280',
      fontSize: '13px',
      textAlign: 'center',
      lineHeight: '1.5'
    },
    termsLink: {
      color: '#3b82f6',
      textDecoration: 'none'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px'
    },
    validationRules: {
      marginTop: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    validationRule: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px'
    },
  };

  export default styles;