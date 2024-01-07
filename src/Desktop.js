import React, { useState } from "react";
import { ReactComponent as MailIcon } from "bootstrap-icons/icons/envelope-heart-fill.svg";
import { ReactComponent as TwitterIcon } from "bootstrap-icons/icons/twitter.svg";
import { ReactComponent as AIAppIcon} from "bootstrap-icons/icons/bar-chart-line.svg";
import { ReactComponent as QuestinComponentIcon} from "bootstrap-icons/icons/magic.svg";
import "./Desktop.css";
import Mail from "./Mail";
import Tweet from "./tweet";
import AIApp from "./AIApp";
import Clock from "./Clock";
import QuestionComponent from "./QuestionComponent";

const Icon = ({ icon, onClick }) => {
  return (
    <div className="icon" onClick={onClick}>
      {icon}
    </div>
  );
};

const Desktop = () => {
  const apps = [
    {
      name: "Tweeter",
      icon: <TwitterIcon style={{ color: "blue" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "mail",
      icon: <MailIcon style={{ color: "red" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "aiapp",
      icon: <AIAppIcon style={{ color: "green" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "QuestionComponent",
      icon: <QuestinComponentIcon style={{ color: "orange" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
  ];

  apps.forEach((app) => {
    app.toggle = () => app.isMinimized[1](!app.isMinimized[0]);
  });

  return (
    <>
      <div className="statusBar">
        <Clock />
      </div>
      <div className="dock">
        {apps.map((app, index) => (
          <Icon key={index} icon={app.icon} onClick={app.toggle} />
        ))}
      </div>

      <Tweet onMinimize={apps[0].toggle} isMinimized={apps[0].isMinimized[0]} />
      <Mail onMinimize={apps[1].toggle} isMinimized={apps[1].isMinimized[0]} />
      <AIApp onMinimize={apps[2].toggle} isMinimized={apps[2].isMinimized[0]} />
      <QuestionComponent
        onMinimize={apps[3].toggle}
        isMinimized={apps[3].isMinimized[0]}
      />
    </>
  );
};

export default Desktop;
