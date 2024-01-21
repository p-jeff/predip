import React, { useState, useEffect } from "react";
import "./stock.css";
import Draggable from "react-draggable";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ReactComponent as Up } from "bootstrap-icons/icons/graph-up-arrow.svg";
import { ReactComponent as Down } from "bootstrap-icons/icons/graph-down-arrow.svg";

const Graph = () => {
  const initialScores = [-5, 10, 0, 7, 12, 10, 3, -4, -8, 0]; // Initial scores
  let isHigher = true;
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

        isHigher = latestValue < data.stockValue;

        console.log(`Is the new entry higher? ${isHigher}`);

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
        {isHigher ? <Up style={{color:'lightgreen' }}/> : <Down style={{color:'red'}} />} Today Ethico Stock is {""}
        {isHigher ? <span style={{color:'lightgreen' }}>up</span> : <span style={{color:'red'}}>down</span>}
      </div>
      <div style={{maxHeight:'50%', display: 'flex', justifyContent:'center', alignItems:"center"}}>
        <Line data={graphData} style={{ fontFamily: "Times New Roman" }} />
      </div>
    </>
  );
};

const StockComponent = ({ onMinimize, isMinimized }) => {
  return (
    <Draggable defaultPosition={{ x: 0, y: 700 }}>
      <div
        className="ai-dashboard"
        style={{ display: isMinimized ? "none" : "block" }}
      >
        <button
          className="minimize"
          onClick={onMinimize}
          style={{
            pointerEvents: "none",
            backgroundColor: "grey",
            cursor: "not-allowed",
          }}
        >
          &times;
        </button>
        <h1>Stocks</h1>
        <Graph />
      </div>
    </Draggable>
  );
};

export default StockComponent;
