import React from "react";
import "./Team.css";

const teamMembers = [
  {
    name: "Akash Kumar Singh",
    role: "Full Stack Developer, Co-founder",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/977/075/non_2x/line-icon-for-founder-vector.jpg",
  }
];

export default function Team() {
  return (
    <div className="team-wrapper">
      <div className="team-container">
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

        <div className="carousel">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="card">
              <img src={member.image} alt={member.name} className="avatar" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
