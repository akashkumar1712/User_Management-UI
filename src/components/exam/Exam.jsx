import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Exam.css'; // Create a CSS file for styling

const Exam = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);    //add error state


  // Fetch exam questions (replace with your actual data fetching logic)
  useEffect(() => {
    // Simulate fetching questions from a server or local file
    const fetchQuestions = async () => {
      try {
        // In a real application, you would fetch questions based on the courseId
        // Example:  /api/exams/${courseId}
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Sample MCQ questions (replace with your actual data)
        const sampleQuestions = [
          {
            id: '1',
            question: 'What is the capital of France?',
            options: [
              'London',
              'Paris',
              'Berlin',
              'Rome',
            ],
            correctAnswer: 'Paris',
          },
          {
            id: '2',
            question: 'What is the highest mountain in the world?',
            options: [
              'K2',
              'Kangchenjunga',
              'Mount Everest',
              'Lhotse',
            ],
            correctAnswer: 'Mount Everest',
          },
          {
            id: '3',
            question: 'What is the chemical symbol for water?',
            options: ['Wo', 'Wa', 'H2O', 'HO2'],
            correctAnswer: 'H2O',
          },
            {
            id: '4',
            question: 'Which planet is known as the "Red Planet"?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswer: 'Mars',
          },
          {
            id: '5',
            question: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctAnswer: 'Pacific Ocean',
          },
        ];

        if(courseId === "1"){
          setQuestions(sampleQuestions);
        }
        else if(courseId === "2"){
          setQuestions(sampleQuestions.slice(0,3));
        }
        else{
          setQuestions([]);
          setError("Exam not Found")
        }


        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch questions."); //set Error Message
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return; // Prevent going to next question without selecting

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    setSelectedAnswer(null); // Reset selected answer for next question

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setExamFinished(true);
    }
  };

    const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const handleFinishExam = () => {
        if (selectedAnswer === null) return;

        if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        setExamFinished(true);
    }

  if (loading) {
    return <div className="exam-loading">Loading Exam...</div>; //show loading
  }
  if(error){
    return <div className='exam-error'>Error: {error}</div>
  }

  if (examFinished) {
    return (
      <div className="exam-results">
        <h1>Exam Finished!</h1>
        <p>Your Score: {score} / {questions.length}</p>
        {/* You can add more detailed results and options here */}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
        <div className="exam-no-questions">
          <p>No questions available for this exam.</p>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="exam-container">
      <h1>Course {courseId} Exam</h1>

      <div className="question-card">
        <h2 className="question-number">Question {currentQuestionIndex + 1} / {questions.length}</h2>
        <p className="question-text">{currentQuestion.question}</p>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </div>
          ))}
        </div>
        {currentQuestionIndex > 0 && (
          <button className="prev-button" onClick={handlePreviousQuestion}>
            Previous
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        className="next-button"
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null} // Disable if no answer
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="finish-button"
                        onClick={handleFinishExam}
                        disabled={selectedAnswer === null}
                    >
                        Finish Exam
                    </button>
                )}
      </div>
    </div>
  );
};

export default Exam;
