import React, { useEffect, useState } from "react";
import Money from "bootstrap-icons/icons/currency-dollar.svg"

const MoneyScore = () => {
  const [score, setScore] = useState(null);

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

  return (
    <div>
      {score !== null && (
        <div>
<img src={Money} alt="Money" width="32" height="32" />
          <span>{score}</span>
        </div>
      )}
    </div>
  );
};

export default MoneyScore;
