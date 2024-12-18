import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const predefinedSkills = [
  "Docker",
  "JavaScript",
  "Git",
  "Solitude",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "SQL",
  "AWS",
  "Machine Learning",
  "Data Analysis",
];

function SignupStep3() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  //   // Toggle skill selection
  //   const toggleSkill = (skill) => {
  //     if (skills.includes(skill)) {
  //       setSkills(skills.filter((s) => s !== skill));
  //     } else {
  //       setSkills([...skills, skill]);
  //     }
  //   };

  const filteredSkills = predefinedSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchInput.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSearchInput("");
    setCustomSkill("");
    setShowDropdown(false);
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const submitSkills = async () => {
    try {
      //   await axios.post("http://localhost:5000/api/signup-step3", { skills });
      //   alert("Skills submitted successfully!");
      const response = await fetch("http://localhost:5000/api/signup-step3", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/username"); // Redirect to dashboard or another page
      } else {
        alert(data.message);
      }
      //   navigate("/username");
    } catch (error) {
      alert("Failed to submit skills.");
    }
  };

  return (
    <div>
      <div className="signup-container">
        <h1>Colective</h1>
        <p>Collaborate. Create. Succeed.</p>
        <div className="signup-form">
          <h2>Join Colective</h2>
          <p>Create your account to start collaborating</p>
          {/* Searchable Dropdown */}
          <div className="dropdown-wrapper">
            <input
              type="text"
              placeholder="Add a skill"
              value={searchInput}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {showDropdown && (
              <div
                className="dropdown-list"
                onMouseLeave={() => setShowDropdown(false)}
              >
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="dropdown-item"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">No skills found</div>
                )}
              </div>
            )}
          </div>

          {/* Custom Skill Input */}
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter custom skill"
              value={customSkill}
              style={{ width: "400px" }}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
          </div>
          <button onClick={() => addSkill(customSkill)}>Add</button>

          {/* Display Selected Skills */}
          <div className="skills-container">
            {skills.map((skill, index) => (
              <div key={index} className="skill selected">
                {skill}
                <span className="remove" onClick={() => removeSkill(skill)}>
                  &times;
                </span>
              </div>
            ))}
          </div>

          <button className="submit-btn" onClick={submitSkills}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupStep3;
