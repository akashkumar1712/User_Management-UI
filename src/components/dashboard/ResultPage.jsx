import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Expect userId also passed in location.state from previous page
  const { questions = [], answers = {}, userId } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [rewardGiven, setRewardGiven] = useState(false);
  const [updatedCredits, setUpdatedCredits] = useState(null);

  useEffect(() => {
    const emailId = localStorage.getItem('email');
    if (!questions.length || !emailId) {
        alert('Email Id is not present')
      setLoading(false);
      return;
    }

    
    const payload = {
      emailId,  // include userId here
      answers: questions.map(q => ({
        questionId: q.id,
        answerOptionId: answers[q.id] || null,
      })),
    };

    const token = localStorage.getItem('authToken');
    

    fetch('http://localhost:1010/api/exams/submit', {
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

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading results...</div>;

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>
        <h2>Error: {error}</h2>
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: 20, padding: '10px 20px' }}>
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>No result data found.</h2>
        <button onClick={() => navigate('/dashboard')} style={{ marginTop: 20, padding: '10px 20px' }}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { total, correct, incorrect, notAttempted, percentage, creditsEarned } = resultData;

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>✅ Exam Submitted Successfully!</h1>
      <h2>📊 Your Result</h2>
      <p><strong>Total Questions:</strong> {total}</p>
      <p><strong>Correct Answers:</strong> ✅ {correct}</p>
      <p><strong>Incorrect Answers:</strong> ❌ {incorrect}</p>
      <p><strong>Not Attempted:</strong> ⚪ {notAttempted}</p>
      <p><strong>Score Percentage:</strong> {percentage.toFixed(2)}%</p>
      {/* <p><strong>Credits Earned:</strong> {creditsEarned}</p> */}

      {rewardGiven && <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 You earned 2 coin in your wallet!</p>}

      {/* {updatedCredits !== null && (
        <p style={{ color: 'blue', fontWeight: 'bold' }}>
          💰 Your updated credits: {updatedCredits}
        </p>
      )} */}

      <button onClick={() => navigate('/dashboard')} style={{ marginTop: 20, padding: '10px 20px' }}>
        Go Back to Dashboard
      </button>
    </div>
  );
}

export default ResultPage;
