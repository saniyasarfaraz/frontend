import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignupStep1";
import Course from "./components/SignupStep2";
import Step3 from "./components/SignupStep3";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/course" element={<Course />} />
        <Route path="/login" element={<Login />} />
        <Route path="/skills" element={<Step3 />} />
      </Routes>
    </Router>
  );
}

export default App;
