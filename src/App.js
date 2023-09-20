import React, { useState } from 'react';
import './App.css'
import { useQuizzes } from './hooks/quiz';
import QuizzesList from './components/QuizzesList';
function App() {
  const { quizzes, setQuizzes } = useQuizzes()
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    url: '',
    questions: [],
  });
  const [questionForm, setQuestionForm] = useState({
    text: '',
    answers: [],
  });
  const [answerForm, setAnswerForm] = useState({
    text: '',
    isTrue: false,
  });

  const handleQuizFormChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  const handleQuestionFormChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
  };

  const handleAnswerFormChange = (e) => {
    setAnswerForm({ ...answerForm, [e.target.name]: e.target.value });
  };
  const handleAnswerFormCheckbox = (e) => {
    setAnswerForm({ ...answerForm, isTrue: !answerForm.isTrue });
  };
  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: questionForm.text,
      answers: questionForm.answers,
    };

    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, newQuestion],
    });

    setQuestionForm({ text: '', answers: [] });
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      id: Date.now(),
      text: answerForm.text,
      isTrue: answerForm.isTrue,
    };

    setQuestionForm({
      ...questionForm,
      answers: [...questionForm.answers, newAnswer],
    });

    setAnswerForm({ text: '', isTrue: false });
  };


  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizForm({
      title: quiz.title,
      description: quiz.description,
      url: quiz.url,
      questions: quiz.questions,
    });
  };




  const handleQuizSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: quizForm.title,
          description: quizForm.description,
          url: quizForm.url,
          questions: quizForm.questions,
        }),
      });
      const data = await response.json();
      setQuizzes([...quizzes, data]);
      setQuizForm({ title: '', description: '', url: '', questions: [] });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  return (
    <div className="container">
      <div className='quiz'>

        <h1>Quiz Creator/Editor</h1>
        <QuizzesList handleEditQuiz={handleEditQuiz} />

        <h2>Create/Edit Quiz:</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={quizForm.title}
              onChange={handleQuizFormChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={quizForm.description}
              onChange={handleQuizFormChange}
              required
            />
          </label>
          <br />
          <label>
            URL:
            <input
              type="text"
              name="url"
              value={quizForm.url}
              required
              onChange={handleQuizFormChange}
            />
          </label>
          <br />
          <h3>Questions:</h3>
          {quizForm.questions.length > 0 ? (
            quizForm.questions.map((question) => (
              <div key={question.id}>
                <h4>{question.text}</h4>
                <ul>
                  {question.answers.map((answer) => (
                    <li key={answer.id}>
                      {answer.text} {answer.isTrue ? '(Correct)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No questions added</p>
          )}
          <br />
          <label>
            Question:
            <input
              type="text"
              name="text"
              value={questionForm.text}
              onChange={handleQuestionFormChange}
            />
          </label>
          <br />
          <label>
            Answer:
            <input
              type="text"
              name="text"
              value={answerForm.text}
              onChange={handleAnswerFormChange}
            />
          </label>
          <div className='flex'>
            <label>
              Is Correct:
            </label>
            <input
              type="checkbox"
              name="isTrue"
              checked={answerForm.isTrue}
              onChange={handleAnswerFormCheckbox}
            />
          </div>

          <br />
          <button type="button" onClick={handleAddAnswer}>
            Add Answer
          </button>
          <br />
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <br />
          <button type="button" onClick={handleQuizSubmit}>
            Submit Quiz
          </button>
        </form>
      </div>

    </div>
  );
}

export default App;