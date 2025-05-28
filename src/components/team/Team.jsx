import React, { useState } from "react";
import "./Team.css";

const teamMembers = [
  {
    name: "Akash Kumar Singh",
    role: "Full Stack Developer, Co-founder",
    image: "/images/pic.jpg",
  },
  {
    name: "Amit Saini",
    role: "Frontend Developer, Partner",
    image: "/images/pic.jpg",
  },
  // Add more members if needed
];

export default function Team() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const visibleMembers = teamMembers.slice(startIndex, startIndex + 2);

  return (
    <div className="team-wrapper">
      <div className="team-container">
        {/* Left Text */}
        <div className="quote-box">
          <p className="quote-text">
            Together, we cover <br />
            a comprehensive <br />
            design spectrum <br />
            and have a wide <br />
            range of <br />
            competences
          </p>
        </div>

        {/* Right Carousel */}
        <div className="carousel">
          <button className="nav-button left" onClick={handlePrev}>&#10094;</button>
          {visibleMembers.map((member, idx) => (
            <div key={idx} className="card">
              <img src={member.image} alt={member.name} className="avatar" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
          <button className="nav-button right" onClick={handleNext}>&#10095;</button>
        </div>
      </div>
    </div>
  );
}
