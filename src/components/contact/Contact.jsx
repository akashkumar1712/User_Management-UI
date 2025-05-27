import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>Welcome to ExamPro</h1>
        <p>Your Trusted Online Examination Platform</p>
      </header>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>To provide a secure, reliable, and user-friendly online examination platform that empowers educational institutions and organizations to conduct assessments efficiently while ensuring academic integrity.</p>
      </section>

      <section className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Advanced security measures with Spring Security integration to protect user data and exam integrity.</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Assessment</h3>
            <p>Instant evaluation and feedback system powered by our robust React.js frontend.</p>
          </div>
          <div className="feature-card">
            <h3>Data Protection</h3>
            <p>Reliable data storage and management using MySQL Workbench with regular backups.</p>
          </div>
          <div className="feature-card">
            <h3>Analytics Dashboard</h3>
            <p>Comprehensive reporting and analytics for performance tracking and insights.</p>
          </div>
        </div>
      </section>

      <section className="tech-stack-section">
        <h2>Our Technology Stack</h2>
        <div className="tech-stack-grid">
          <div className="tech-item">
            <h3>Frontend</h3>
            <p>React.js</p>
          </div>
          <div className="tech-item">
            <h3>Backend</h3>
            <p>Java Spring Boot</p>
          </div>
          <div className="tech-item">
            <h3>Database</h3>
            <p>MySQL</p>
          </div>
          <div className="tech-item">
            <h3>Security</h3>
            <p>Spring Security</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions about our platform? We're here to help!</p>
        <button className="contact-button">Contact Us</button>
      </section>
    </div>
  );
};

export default Contact;