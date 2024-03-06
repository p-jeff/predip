import React, { useState, useEffect } from "react";
import "../styling/stock.css";
import Draggable from "react-draggable";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ReactComponent as Up } from "bootstrap-icons/icons/graph-up-arrow.svg";
import { ReactComponent as Down } from "bootstrap-icons/icons/graph-down-arrow.svg";
import { notificationPop } from "../boilerplate";
import EthicsDash from "../components/EthicsDash";

const Graph = ({ updated }) => {
  const initialScores = [-5, 10, 0, 7, 12, 10, 3, -4, -8, 0]; // Initial scores
  const [isHigher, setIsHigher] = useState(true);
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

      setGraphData((prevData) => {
        const newData = {
          ...prevData,
          labels: [...prevData.labels, prevData.labels.length + 1],
          datasets: [
            {
              ...prevData.datasets[0],
              data: [...prevData.datasets[0].data, data.stockValue],
            },
          ],
        };

        const latestValue =
          newData.datasets[0].data[newData.datasets[0].data.length - 2];

        if (latestValue < data.stockValue) {
          notificationPop("moneyUp.wav");

          setIsHigher(true);
          updated();
        } else {
          notificationPop("moneyDown.wav");

          setIsHigher(false);
          updated();
        }
        return newData;
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="isUp">
        {isHigher ? <Up className="up" /> : <Down className="down" />} Today
        Ethico Stock is {""}
        {isHigher ? (
          <span className="up">up</span>
        ) : (
          <span className="down">down</span>
        )}
      </div>
      <div
        style={{
          maxHeight: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Line data={graphData} style={{ fontFamily: "Times New Roman" }} />
      </div>
    </>
  );
};
const StockComponent = ({ onMinimize, isMinimized, event }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  // Function to handle updates
  const handleUpdate = () => {
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000); // Reset after animation duration
  };

  return isMinimized ? (
    <EthicsDash onMinimize={onMinimize} event={event} />
  ) : (
    <Draggable defaultPosition={{ x: 0, y: 650 }}>
      <div className={`ai-dashboard ${isUpdated ? "highlight" : ""}`}>
        <button
          className="minimize"
          onClick={onMinimize}
          style={{
            backgroundColor: "grey",
            cursor: "not-allowed"
          }}
        >
          &times;
        </button>
        <h1>Stocks</h1>
        <Graph updated={handleUpdate} />
      </div>
    </Draggable>
  );
};

export default StockComponent;
