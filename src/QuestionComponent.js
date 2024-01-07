import React, { useState } from "react";
import "./QuestionComponent.css"; // Import the CSS file for styling
import QA from "./QA";
import Draggable from "react-draggable";

const QuestionComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = QA[currentQuestionIndex];

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

    console.log(QA.length)

    if (currentQuestionIndex === QA.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <Draggable>
      <div className="question-container">
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
