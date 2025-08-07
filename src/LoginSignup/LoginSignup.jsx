import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginSignup/LoginSignup.css';

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

function LoginSignup() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const getCurrentDomain = () => window.location.origin;

  const handleSubmit = async () => {
    const domain = getCurrentDomain();

    let url = "";
    let options = {};

    if (action === "Login") {
      const query = new URLSearchParams({ email, password }).toString();
      url = `https://nomapi.onrender.com/api/v1/user?${query}`;
      options = { method: "GET" };
    } else {
      url = "https://nomapi.onrender.com/api/v1/user";
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          phone,
          domain
        })
      };
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.detail || "Something went wrong.");
        setIsError(true);
      } else {
        if (action === "Sign Up") {
          setMessage("Sign up successful. Please check your email to verify your account.");
        } else {
          setMessage("Login successful.");
        }
        setIsError(false);
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        {message && (
          <div className={isError ? 'error-found' : 'success-found'}>
            {message}
          </div>
        )}
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Forgot Password?{" "}
          <span onClick={() => navigate("/ForgotPassword")}>Click here</span>
        </div>
      )}

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          {action}
        </div>
      </div>

      <div className="toggle-container">
        {action === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span className="toggle-link" onClick={() => setAction("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="toggle-link" onClick={() => setAction("Login")}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
