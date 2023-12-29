import React, { useState } from "react";
import "./Desktop.css";
import Mail from "./Mail";
import Tweet from "./tweet";
import AIApp from "./AIApp";

const Icon = ({ name, onClick }) => {
  return <div onClick={onClick} className="icon">{name}</div>;
};

const Desktop = () => {
  const apps = [
    { name: "Tweeter", isMinimized: useState(false), toggle: () => {} },
    { name: "mail", isMinimized: useState(false), toggle: () => {} },
    { name: "aiapp", isMinimized: useState(false), toggle: () => {} },
  ];

  // Update the toggle functions for each app
  apps[0].toggle = () => apps[0].isMinimized[1](!apps[0].isMinimized[0]);
  apps[1].toggle = () => apps[1].isMinimized[1](!apps[1].isMinimized[0]);
  apps[2].toggle = () => apps[2].isMinimized[1](!apps[2].isMinimized[0]);

  return (
    <>
      <div className="dock">
        {apps.map(
          (app, index) =>
            app.isMinimized[0] && (
              <Icon key={index} name={app.name} onClick={app.toggle} />
            )
        )}
      </div>

      {!apps[0].isMinimized[0] && <Tweet onMinimize={apps[0].toggle} />}
      {!apps[1].isMinimized[0] && <Mail onMinimize={apps[1].toggle} />}
      {!apps[2].isMinimized[0] && <AIApp onMinimize={apps[2].toggle} />}
    </>
  );
};

export default Desktop;
