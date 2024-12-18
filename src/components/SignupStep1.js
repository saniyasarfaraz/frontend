import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupStep1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signup-step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/course", { state: { email } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-container">
      <h1>Colective</h1>
      <p>Collaborate. Create. Connect.</p>
      <div className="signup-form">
        <h2>Join Colective</h2>
        <p>Create your account to start Collaborating</p>
        <label htmlFor="course" className="course-label">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="course" className="course-label">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="course" className="course-label">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default SignupStep1;
