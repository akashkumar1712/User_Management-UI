import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>Welcome to Edu-Edge</h1>
        <div className="glow-container">
          <p
            className="glow-moving-text"
            data-text="Your Trusted Online Examination Platform"
          ></p>
        </div>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To provide a secure, reliable, and user-friendly online examination
          platform that empowers educational institutions and organizations to
          conduct assessments efficiently while ensuring academic integrity.
        </p>
      </section>

      <section className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/836/933/original/authentication-concept-icon-user-authorization-login-personal-privacy-protection-with-password-cybersecurity-system-idea-thin-line-illustration-isolated-outline-drawing-vector.jpg"
              alt="Secure Authentication"
              className="feature-image"
            />
            <h3>Secure Authentication</h3>
            <p>
              Advanced security measures with Spring Security integration to
              protect user data and exam integrity.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://img.freepik.com/premium-vector/assessment-services-concept-icon_106317-34690.jpg?w=2000"
              alt="Real-time Assessment"
              className="feature-image"
            />
            <h3>Real-time Assessment</h3>
            <p>
              Instant evaluation and feedback system powered by our robust
              React.js frontend.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/170/014/original/data-protection-icon-on-white-background-illustration-vector.jpg"
              alt="Data Protection"
              className="feature-image"
            />
            <h3>Data Protection</h3>
            <p>
              Reliable data storage and management using MySQL Workbench with
              regular backups.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://cdn0.iconfinder.com/data/icons/charts-analytics/128/Charts_Analytics_kpi_dashboard_report_pie_bar-1024.png"
              alt="Analytics Dashboard"
              className="feature-image"
            />
            <h3>Analytics Dashboard</h3>
            <p>
              Comprehensive reporting and analytics for performance tracking and
              insights.
            </p>
          </div>
        </div>
      </section>

      <section className="tech-stack-section">
        <h2>Our Technology Stack</h2>
        <div className="tech-stack-grid">
          <div className="tech-item">
            <img
              src="https://pluspng.com/img-png/react-logo-png-img-react-logo-png-react-js-logo-png-transparent-png-1142x1027.png"
              alt="React.js"
              className="tech-image"
            />
            <h3>Frontend</h3>
            <p>React.js</p>
          </div>
          <div className="tech-item">
            <img
              src="https://miro.medium.com/v2/resize:fit:1200/1*aXe6MaOyhdIP5WqdPHhSFw.png"
              alt="Java Spring Boot"
              className="tech-image"
            />
            <h3>Backend</h3>
            <p>Java Spring Boot</p>
          </div>
          <div className="tech-item">
            <img
              src="https://pngimg.com/d/mysql_PNG34.png"
              alt="MySQL"
              className="tech-image"
            />
            <h3>Database</h3>
            <p>MySQL</p>
          </div>
          <div className="tech-item">
            <img
              src="https://dz2cdn1.dzone.com/storage/temp/15154975-spring-security-logo-1.png"
              alt="Spring Security"
              className="tech-image"
            />
            <h3>Security</h3>
            <p>Spring Security</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
