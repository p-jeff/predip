import React, { useState } from "react";
import "./QuestionComponent.css"; // Import the CSS file for styling
import QA from "./data/QA";
import Draggable from "react-draggable";
import axios from "axios";
import { Resizable } from "re-resizable";
import 'bootstrap-icons/font/bootstrap-icons.css';

const QuestionComponent = ({ isMinimized, onMinimize, onStrike}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const currentQuestion = QA[currentQuestionIndex];

  function sendCurrentQuestionIndex(currentQuestionIndex, result) {
    axios
      .post("http://localhost:3001/api/questionIndex", {
        currentQuestionIndex: currentQuestionIndex,
        currentDecision: result.decisionId,
        currentLevel: result.levelId,
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
      levelId: currentQuestion.level,
      answerId: selectedAnswer,
      decisionId: 'decision' + selectedAnswer,
    };
    console.log(result); // Handle the submission here

    if(currentQuestion.strike.includes(result.decisionId)){
      onStrike()
    }

    setSelectedAnswer(null);

    if (currentQuestionIndex === QA.length - 1) {
      setCurrentQuestionIndex(0);
      sendCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      sendCurrentQuestionIndex(currentQuestionIndex + 1, result);
    }
  };

  return (
    <Draggable handle="header" defaultPosition={{ x: 800, y: 100 }}>
      <div
        className="question-container"
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <header className="ethHeader">
        <i className="bi bi-compass headerIcon"/>
            EthCompass v.1.3.2
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <Resizable className="ethCompassBody"  defaultSize={{
            width: 900,
            height:400,
          }}>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.case.map((c, index) => ( <p key={index}>{c}</p>))}

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
        </Resizable>
      </div>
    </Draggable>
  );
};

export default QuestionComponent;
