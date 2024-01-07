import React from 'react';
import './AIDashboardStyles.css';
import NetworkSimulation from './Network';
import Draggable from 'react-draggable';
import DisplayResponse from './DisplayResponse';

const LineGraph = () => (
  <div className="line-graph">
    <div style={{ left: '10%', height: '50%' }}></div>
    <div style={{ left: '30%', height: '30%', animationDelay: '0.5s' }}></div>
    <div style={{ left: '50%', height: '70%', animationDelay: '1s' }}></div>
    <div style={{ left: '70%', height: '20%', animationDelay: '1.5s' }}></div>
  </div>
);

const StateComponent = () => (
  <div className="state-component">
    <p>AI State: Active</p>
  </div>
);

const AIApp = ({onMinimize}) => (
  <Draggable>
  <div className="ai-dashboard">
     <button className="minimize" onClick={onMinimize}>
          &times;
        </button>
    <h1>AI Dashboard</h1>
    <StateComponent />
    <LineGraph />
    <NetworkSimulation />
    <DisplayResponse />
  </div>
  </Draggable>
);

export default AIApp;
