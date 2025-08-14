import './App.css';
import './index.css';
import LoginSignup from './components/LoginSignup';
import ForgotPassword from './components/ForgotPassword';
import ResetLink from './components/ResetLink';
import Verify from './components/Verify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LoginSignup />} />

        {/* Forgot password route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Reset password route */}
        <Route path="/reset-password" element={<ResetLink />} />

        {/* Verify route */}
        <Route path="/verify" element={ <Verify />} />
      </Routes>
    </Router>
  );
}

export default App;
