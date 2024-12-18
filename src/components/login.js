import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard or user home page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Colective</h1>
      <p>Collaborate. Create. Succeed.</p>
      <div className="signup-form">
        <h2>Log in to Colective</h2>
        <div>
          <label htmlFor="emailOrUsername" className="login-label">
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            type="text"
            className="login-input"
            placeholder="Enter your email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <p className="login-signup">
          Don’t have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
