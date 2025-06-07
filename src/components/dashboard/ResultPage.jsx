import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], answers = {}, userId } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [rewardGiven, setRewardGiven] = useState(false);
  const [updatedCredits, setUpdatedCredits] = useState(null);

  useEffect(() => {
    const emailId = localStorage.getItem('email');
    if (!questions.length || !emailId) {
      alert('Email Id is not present');
      setLoading(false);
      return;
    }

    const payload = {
      emailId,
      answers: questions.map(q => ({
        questionId: q.id,
        answerOptionId: answers[q.id] || null,
      })),
    };

    const token = localStorage.getItem('authToken');

    fetch('https://edutech-login-backend.onrender.com/api/exams/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit answers');
        return res.json();
      })
      .then(data => {
        if (data && data.success) {
          setResultData(data.result);
          setLoading(false);

          if (data.result.percentage >= 6) {
            setRewardGiven(true);
            if (data.result.creditsEarned !== undefined) {
              setUpdatedCredits(data.result.creditsEarned);
            }
            alert('🎉 Congrats! You earned 2 coin as a reward!');
          }
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [questions, answers, userId]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#fff' }}>Loading results...</div>;

  if (error) {
    return (
      <div className="result-container">
        <h2>Error: {error}</h2>
        <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="result-container">
        <h2>No result data found.</h2>
        <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { total, correct, incorrect, notAttempted, percentage } = resultData;

  return (
    <div className="result-container">
      <h1>✅ Exam Submitted Successfully!</h1>
      <h2>📊 Your Result</h2>
      <p><strong>Total Questions:</strong> {total}</p>
      <p><strong>Correct Answers:</strong> ✅ {correct}</p>
      <p><strong>Incorrect Answers:</strong> ❌ {incorrect}</p>
      <p><strong>Not Attempted:</strong> ⚪ {notAttempted}</p>
      <p><strong>Score Percentage:</strong> {percentage.toFixed(2)}%</p>

      {rewardGiven && (
        <p style={{ color: 'lime', fontWeight: 'bold' }}>
          🎉 You earned 2 coin in your wallet!
        </p>
      )}

      <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
        Go Back to Dashboard
      </button>
    </div>
  );
}

export default ResultPage;
