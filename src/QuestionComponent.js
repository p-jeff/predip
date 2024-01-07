import React, { useState } from "react";
import "./QuestionComponent.css"; // Import the CSS file for styling
import QA from "./data/QA";
import Draggable from "react-draggable";
import axios from "axios";

const QuestionComponent = ({ isMinimized, onMinimize }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = QA[currentQuestionIndex];

  function sendCurrentQuestionIndex(currentQuestionIndex) {
    axios
      .post("http://localhost:3001/api/questionIndex", {
        // Replace '/api/path' with your actual API path
        currentQuestionIndex,
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    const result = {
      questionId: currentQuestion.id,
      answerId: selectedAnswer,
    };
    console.log(result); // Handle the submission here
    // Reset for the next question or handle as needed
    setSelectedAnswer(null);

    console.log(QA.length);

    if (currentQuestionIndex === QA.length - 1) {
      setCurrentQuestionIndex(0);
      sendCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      sendCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <Draggable>
      <div
        className="question-container"
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <button className="minimize" onClick={onMinimize}>
          &times;
        </button>
        <h2>{currentQuestion.question}</h2>
        <div>
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={selectedAnswer === index ? "selected" : ""}
            >
              {answer}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={selectedAnswer === null}>
          Submit
        </button>
      </div>
    </Draggable>
  );
};

export default QuestionComponent;
