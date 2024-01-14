import React, { useEffect, useState } from "react";
import Money from "bootstrap-icons/icons/currency-dollar.svg"
import Love from "bootstrap-icons/icons/heart.svg"
import "./MoneyScore.css";

const MoneyScore = ({strikes}) => {
  
  const [strikeArray, setStrikeArray] = useState([]);

  

  useEffect(() => { 
    setStrikeArray(Array.from({ length: strikes }));
    console.log(strikes);
  }, [strikes]);

  return (
    <div className="moneyScore">
      <div className="strike">
        {strikeArray.map((strike, index) => (
          <span key={index}>x</span>
        ))}
      </div>
    </div>
  );
};

export default MoneyScore;
