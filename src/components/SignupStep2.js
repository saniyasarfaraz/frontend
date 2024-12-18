import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupStep2 = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Get email from state passed in Step 1

  const courses = ["B.Tech", "M.Tech", "MBA", "B.Pharma"]; // Predefined courses
  const branch = [
    "Computer Science",
    "Electrical",
    "Mechanical",
    "Information Technology",
    "Civil",
    "Other",
  ];
  const year = ["1", "2", "3", "4"];

  const handleSubmit = async () => {
    if (selectedCourse === "" || selectedCourse === "" || selectedYear === "") {
      alert("Please select a course!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup-step2", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          course: selectedCourse,
          branch: selectedBranch,
          year: selectedYear,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/skills"); // Redirect to dashboard or another page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("Error submitting details");
    }
  };

  return (
    <div className="signup-container">
      <h1>Colective</h1>
      <p>Collaborate. Create. Succeed.</p>
      <div className="signup-form">
        <h2>Join Colective</h2>
        <p>Create your account to start collaborating</p>
        <div className="course-form">
          <label htmlFor="course" className="course-label">
            Course
          </label>
          <select
            id="course"
            className="dropdown"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          {/* branch */}
          <label htmlFor="course" className="course-label">
            Branch
          </label>
          <select
            id="branch"
            className="dropdown"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branch.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          {/* year */}
          <label htmlFor="course" className="course-label">
            Year
          </label>
          <select
            id="year"
            className="dropdown"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {year.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button className="course-next-btn" onClick={handleSubmit}>
            Next
          </button>
        </div>
        <p className="login">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupStep2;
