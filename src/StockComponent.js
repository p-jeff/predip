import React, { useState, useEffect } from "react";
import "./AIDashboardStyles.css";
import Draggable from "react-draggable";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Graph = () => {
  const initialScores = [-5, 10, 0, 7, 12, 10, 3, -4, -8, 0]; // Initial scores
  const [graphData, setGraphData] = useState({
    labels: initialScores.map((_, index) => index + 1), // Initialize labels for the initial scores
    datasets: [
      {
        label: "Ethico",
        data: initialScores, // Set initial data
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0,
      },
    ],
  });

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setGraphData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, prevData.labels.length + 1],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, data.stockValue],
          },
        ],
      }));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <Line data={graphData} />;
};



const StockComponent = ({ onMinimize, isMinimized }) => {
  return (
    <Draggable>
      <div
        className="ai-dashboard"
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <button className="minimize" onClick={onMinimize} style={{ pointerEvents: "none", backgroundColor:"grey", cursor:"not-allowed"}}>
          &times;
        </button>
        <h1>Stocks</h1>
        <Graph />
      </div>
    </Draggable>
  );
};

export default StockComponent;
