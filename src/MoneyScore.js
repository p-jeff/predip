import React, { useEffect, useState } from "react";
import Money from "bootstrap-icons/icons/currency-dollar.svg"
import Love from "bootstrap-icons/icons/heart.svg"
import "./MoneyScore.css";

const MoneyScore = ({strikes}) => {
  const [score, setScore] = useState(null);
  const [strikeArray, setStrikeArray] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setScore(data.judgment);
    };

    return () => {
      // Clean up the event source when the component unmounts
      eventSource.close();
    };
  }, []);

  useEffect(() => { 
    setStrikeArray(Array.from({ length: strikes }));
    console.log(strikes);
  }, [strikes]);

  return (
    <div className="moneyScore">
      
        <div className="dollar">
          <img src={Money} alt="Money" width="32" height="32" />
         { score !== null && (
          <span style={{ color: score >= 0 ? "yellowgreen" : "red" }}>{score}</span>
          )}
        </div>
        <div className="love">
          <img src={Love} alt="Love" width="32" height="32" />
         { score !== null && (
          <span style={{ color: score <= 0 ? "yellowgreen" : "red" }}>{score * -2}</span>
          )}
        </div>
      
      <div className="strike">
        {strikeArray.map((strike, index) => (
          <span key={index}>x</span>
        ))}
      </div>
    </div>
  );
};

export default MoneyScore;
