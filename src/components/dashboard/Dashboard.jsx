import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import AIAssistant from "../ai/AIAssistant"; // adjust the path if needed



function Dashboard({ profile }) {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const { name, email, role, credits } = profile || {};
  const subjects = ['C', 'C++', 'Java'];
  const courseTypes = ['paid', 'free'];

  useEffect(() => {
    if (!name || !email) {
      navigate('/auth');
    }
  }, [navigate, name, email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/home', { replace: true });
  };

  const handleStudyMaterialClick = () => {
    if (!selectedCourse) return alert('Select a course (subject and type)');
    const [subject, type] = selectedCourse.split('-');
    navigate(`/materials/${subject}/${type}`);
  };

  const handleTakeExamClick = () => {
    if (!examSubject) return alert('Select a subject for exam!');
    navigate(`/exam/free/${examSubject}`);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Welcome, {name} 👋</h2>
        <div className="profile-wrapper">
          <div
            className="profile-button"
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Toggle profile dropdown"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setShowProfile(!showProfile);
            }}
          >
            {name?.charAt(0)?.toUpperCase() ?? 'U'}
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <p><strong>{name}</strong></p>
              <p>{email}</p>
              <p>Role: {role}</p>
              <p>Credits: {credits}</p>
              <button className="logout-button" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
      

      <div className="section">
        <label htmlFor="course-select">Select Course:</label>
        <select
          id="course-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Choose Course --</option>
          {subjects.flatMap(subject =>
            courseTypes.map(type => (
              <option key={`${subject}-${type}`} value={`${subject}-${type}`}>
                {`${subject} (${type})`}
              </option>
            ))
          )}
        </select>
        <button onClick={handleStudyMaterialClick}>📘 View Study Materials</button>
      </div>

      <hr />

      <div className="section">
        <label htmlFor="exam-subject-select">Select Subject for Exam:</label>
        <select
          id="exam-subject-select"
          value={examSubject}
          onChange={(e) => setExamSubject(e.target.value)}
        >
          <option value="">-- Choose Subject --</option>
          {subjects.map(subj => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        <button onClick={handleTakeExamClick}>📝 Take Exam</button>
      </div>
    </div>
  );
}

export default Dashboard;
