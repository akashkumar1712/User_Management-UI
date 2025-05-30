import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './exampage.css';

function ExamPage() {
  const { type, course } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [answers, setAnswers] = useState({}); // store selected option IDs here
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const count = 50;
    fetch(`http://localhost:1010/api/exams/${type}/${course}?count=${count}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          setQuestions(data.data);
          setCurrentIndex(0);
        } else {
          const fallback = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            text: `Sample Question ${i + 1}`,
            options: [
              { id: i * 4 + 1, text: 'Option a' },
              { id: i * 4 + 2, text: 'Option b' },
              { id: i * 4 + 3, text: 'Option c' },
              { id: i * 4 + 4, text: 'Option d' },
            ],
          }));
          setQuestions(fallback);
          setCurrentIndex(0);
        }
      })
      .catch(err => {
        const fallback = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          text: `Sample Question ${i + 1}`,
          options: [
            { id: i * 4 + 1, text: 'Option a' },
            { id: i * 4 + 2, text: 'Option b' },
            { id: i * 4 + 3, text: 'Option c' },
            { id: i * 4 + 4, text: 'Option d' },
          ],
        }));
        setQuestions(fallback);
        setCurrentIndex(0);
        alert('❌ Failed to fetch questions. Showing fallback.');
      });
  }, [type, course]);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  // Store option ID on select instead of text
  const handleSelect = (qid, optionId) => {
    setAnswers(prev => ({ ...prev, [qid]: optionId }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    if (!window.confirm("Are you sure you want to submit the exam?")) return;

    setSubmitted(true);

    // Create payload with questionId and answerOptionId (option ID)
    const payload = questions.map(q => ({
      questionId: q.id,
      answerOptionId: answers[q.id] || null,
    }));

    fetch('http://localhost:1010/api/exams/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: payload }),
    })
      .then(res => res.json())
      .then(result => {
        // Navigate with backend response + questions + user's answers
        navigate('/result', { state: { result, questions, answers } });
      })
      .catch(() => {
        alert('Failed to submit exam. Please try again.');
        setSubmitted(false);
      });
  };

  const currentQuestion = currentIndex !== null ? questions[currentIndex] : null;
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="exam-container">
      <div className={`timer-box ${timer <= 300 ? 'blinking' : ''}`}>
        ⏳ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
      </div>

      <div className="sidebar">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={i === currentIndex ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        {!submitted && currentQuestion && (
          <>
            <h3>{`Q${currentIndex + 1}: ${currentQuestion.text}`}</h3>

            {currentQuestion.options.map((opt, idx) => (
              <div key={opt.id || idx} style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id={`q${currentQuestion.id}_opt${idx}`}
                  name={`question_${currentQuestion.id}`}
                  className="custom-radio"
                  checked={answers[currentQuestion.id] === opt.id}
                  onChange={() => handleSelect(currentQuestion.id, opt.id)}
                />
                <label htmlFor={`q${currentQuestion.id}_opt${idx}`} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <span className="radio-letter">{optionLetters[idx]}</span>
                  <span style={{ marginLeft: '5px' }}>{opt.text}</span>
                </label>
              </div>
            ))}

            <div className="question-buttons">
              {currentIndex < questions.length - 1 && (
                <button className="next-small-btn" onClick={() => setCurrentIndex(currentIndex + 1)}>
                  Next
                </button>
              )}
              {currentIndex === questions.length - 1 && (
                <button className="submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExamPage;
