import React, { useState } from "react";
import { ReactComponent as Envelope } from "bootstrap-icons/icons/envelope-heart-fill.svg";
import { ReactComponent as Bird } from "bootstrap-icons/icons/twitter.svg";
import { ReactComponent as AI } from "bootstrap-icons/icons/bar-chart-line.svg";
import "./Desktop.css";
import Mail from "./Mail";
import Tweet from "./tweet";
import AIApp from "./AIApp";
import Clock from "./Clock";

const Icon = ({ icon, onClick }) => {
  return (
    <div className="icon" onClick={onClick} >
      {icon}
      </div>
  );
};

const Desktop = () => {

  const apps = [
    {
      name: "Tweeter",
      icon: <Bird style={{ color: "blue" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "mail",
      icon: <Envelope style={{ color: "white" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "aiapp",
      icon: <AI style={{ color: "green" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
  ];

  
  // Update the toggle functions for each app
  apps[0].toggle = () => apps[0].isMinimized[1](!apps[0].isMinimized[0]);
  apps[1].toggle = () => apps[1].isMinimized[1](!apps[1].isMinimized[0]);
  apps[2].toggle = () => apps[2].isMinimized[1](!apps[2].isMinimized[0]);

  return (
    <>
      <div className="statusBar"><Clock/></div>
      <div className="dock">
        {apps.map((app, index) => (
          <Icon
            key={index}
            icon={app.icon}
            onClick={app.toggle}
          />
        ))}
      </div>

      {!apps[0].isMinimized[0] && <Tweet onMinimize={apps[0].toggle} />}
      {!apps[1].isMinimized[0] && <Mail onMinimize={apps[1].toggle} />}
      {!apps[2].isMinimized[0] && <AIApp onMinimize={apps[2].toggle} />}
    </>
  );
};

export default Desktop;
