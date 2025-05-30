import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import CourseService from '../service/CourseService';
import './dashboard.css';

function Dashboard({ profile }) {
  const navigate = useNavigate();
  // const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const name = profile?.name;
  const email = profile?.email;
  const role = profile?.role;
  const credits = profile?.credits;

  const subjects = ['C', 'C++', 'Java'];
  const courseTypes = ['paid', 'free'];

  useEffect(() => {
    if (!name || !email) {
      navigate('/auth');
      return;
    }

    
  }, [navigate, name, email]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
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
          <div className="profile-button" onClick={() => setShowProfile(!showProfile)}>
            {name?.charAt(0)?.toUpperCase() ?? 'U'}
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <p><strong>{name}</strong></p>
              <p>{email}</p>
              <p>Role: {role}</p>
              <p>Credits: {credits}</p>
              <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <label>Select Course (Subject + Type):</label>
        <select
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

      <hr style={{ margin: '20px 0' }} />

      <div className="section">
        <label>Select Subject for Exam:</label>
        <select
          value={examSubject}
          onChange={(e) => setExamSubject(e.target.value)}
        >
          <option value="">-- Choose Subject --</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        <button onClick={handleTakeExamClick}>📝 Take Exam</button>
      </div>
    </div>
  );
}

export default Dashboard;
