import React, { useEffect, useState } from "react";
import "../styling/StrikeCounter.css";

const StrikeCounter = ({strikes}) => {
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

export default StrikeCounter;
