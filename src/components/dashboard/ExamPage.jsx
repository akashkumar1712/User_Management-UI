import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './exampage.css';

function ExamPage() {
  const { type, course } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(50000); // 1 hour
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/exams/${type}/${course}`)
      .then(res => res.json())
      .then(data => {
        if (!data || data.length === 0) {
          data = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            text: `Sample Question ${i + 1}`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
          }));
        }
        setQuestions(data);
        setCurrentIndex(0);
      })
      .catch(err => {
        console.error('Failed to fetch questions:', err);
        const fallback = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          text: `Sample Question ${i + 1}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
        }));
        setQuestions(fallback);
        setCurrentIndex(0);
      });
  }, [type, course]);

  useEffect(() => {
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
  }, []);

  const handleSelect = (qid, option) => {
    setAnswers(prev => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    alert('✅ Exam submitted successfully!');
    console.log('Submitted Answers:', answers);
    // TODO: Send to backend via fetch POST
  };

  const currentQuestion = currentIndex !== null ? questions[currentIndex] : null;

  return (
    <div className="exam-container" style={{ position: 'relative' }}>
      {/* Timer in Top-Right */}
      <div className="timer-box">
        ⏳ {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {(questions.length > 0 ? questions : Array.from({ length: 10 })).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={i === currentIndex ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Main Question Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {submitted && (
          <div style={{ fontSize: '20px', color: 'green' }}>✅ Exam submitted successfully!</div>
        )}

        {!submitted && currentQuestion && (
          <>
            <h3>{`Q${currentIndex + 1}: ${currentQuestion.text}`}</h3>
            {currentQuestion.options.map((opt, idx) => (
              <div key={idx} style={{ margin: '10px 0' }}>
                <input
                  type="radio"
                  id={`q${currentQuestion.id}_opt${idx}`}
                  name={`question_${currentQuestion.id}`}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => handleSelect(currentQuestion.id, opt)}
                />
                <label htmlFor={`q${currentQuestion.id}_opt${idx}`} style={{ marginLeft: '8px' }}>
                  {opt}
                </label>
              </div>
            ))}

            <div className="question-buttons">
              {currentIndex < questions.length - 1 && (
                <button
                  className="next-small-btn"
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
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

        {!submitted && currentIndex === null && (
          <p>Please select a question number from the sidebar to begin the exam.</p>
        )}
      </div>
    </div>
  );
}

export default ExamPage;
