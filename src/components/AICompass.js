import React, { useState, useEffect } from "react";
import "../styling/AICompass.css";
import Draggable from "react-draggable";

const AICompass = ({ coordinates, level }) => {
  const [point, setPoint] = useState({ x: 4, y: 4 });

  const calcCordinates = (coordinates) => {
    let svgX, svgY;
    if (level === "level2") {
      svgX = (coordinates[0]*4  + 4) * 50; // Scale and shift
      svgY = (4 - coordinates[1]*4) * 50; // Invert y-axis, scale and shift
    } else if (level === "level3") {
        svgX = (coordinates[0]*2  + 4) * 50; // Scale and shift
        svgY = (4 - coordinates[1]*2) * 50; // Invert y-axis, scale and shift
    }
    else {
        svgX = (coordinates[0]  + 4) * 50; // Scale and shift
        svgY = (4 - coordinates[1]) * 50; // Invert y-axis, scale and shift
    }
    setPoint({ x: svgX, y: svgY });
  };

  useEffect(() => {
    if (coordinates) {
      calcCordinates(coordinates);
    } else {
      const eventSource = new EventSource("http://localhost:3001/events");
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data.compassPosition);
        calcCordinates(data.compassPosition);
      };
    }
  }, []) ;

  return (
    <Draggable defaultPosition={{ x: 1050, y: 250 }}>
      <div className="matrix-plot">
      <h2>Your AI Compass</h2>
      <div className="matrixWrapper">
        <svg width="400" height="400" viewBox="-10 -10 420 420">
          {/* Draw matrix grid */}
          <line x1="200" y1="0" x2="200" y2="400" stroke="grey" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="grey" />

          {/* Plot point */}
          <circle cx={point.x} cy={point.y} r="5" fill="red" />

          {/* Add h3 tags */}
          <text x="-5" y="220" className="axis-tag">No AI</text>
          <text x="330" y="220" className="axis-tag">Singularity</text>
          <text x="210" y="400" className="axis-tag">External Regulation</text>
          <text x="210" y="10" className="axis-tag">Self-Determination</text>
        </svg>
      </div>
      </div>
    </Draggable>
  );
};

export default AICompass;
