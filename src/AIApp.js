import React from 'react';
import './AIDashboardStyles.css';
import NetworkSimulation from './Network';

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

const Settings = () => (
  <div className="settings">
    <p>Setting 1: <input className="input-range" type="range" min="1" max="100" /></p>
    <p>Setting 2: <input className="input-range" type="range" min="1" max="100" /></p>
  </div>
);

const AIDashboard = () => (
  <div className="ai-dashboard">
    <h1>AI Dashboard</h1>
    <Settings />
    <StateComponent />
    <LineGraph />
    <NetworkSimulation />
  </div>
);

export const AIApp = () => (
  <AIDashboard />
);

export default AIApp;
