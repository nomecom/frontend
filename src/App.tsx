import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginSignup from './LoginSignup/LoginSignup.jsx';
import ForgotPassword from './LoginSignup/ForgotPassword.jsx';
import ResetPassword from './LoginSignup/ResetPassword.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
