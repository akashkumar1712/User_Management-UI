import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './exampage.css';

function ExamPage() {
  const { type, course } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [answers, setAnswers] = useState({});
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
          const fallback = Array.from({ length: 20 }, (_, i) => ({
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
        const fallback = Array.from({ length: 20 }, (_, i) => ({
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

  const handleSelect = (qid, optionText) => {
    setAnswers(prev => ({ ...prev, [qid]: optionText }));
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    alert('✅ Exam submitted successfully!');
    console.log('Submitted Answers:', answers);
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
        {submitted && <div style={{ fontSize: '20px', color: 'green' }}>✅ Exam submitted successfully!</div>}

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
                  checked={answers[currentQuestion.id] === opt.text}
                  onChange={() => handleSelect(currentQuestion.id, opt.text)}
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
