import React, { useState } from "react";
import { ReactComponent as MailIcon } from "bootstrap-icons/icons/envelope-heart-fill.svg";
import { ReactComponent as TwitterIcon } from "bootstrap-icons/icons/twitter.svg";
import { ReactComponent as AIAppIcon } from "bootstrap-icons/icons/bar-chart-line.svg";
import { ReactComponent as QuestinComponentIcon } from "bootstrap-icons/icons/compass.svg";
import { ReactComponent as ChatIcon } from "bootstrap-icons/icons/chat-left-text.svg";
import "./Desktop.css";
import Mail from "./Mail";
import Tweet from "./tweet";
import AIApp from "./AIApp";
import Clock from "./Clock";
import QuestionComponent from "./QuestionComponent";
import Chat from "./Chat";
import Strike from "./Strike";
import MoneyScore from "./MoneyScore";

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
};

const Icon = ({ icon, onClick, name }) => {
  return (
    <Tooltip text={name}>
      <div className="icon" onClick={onClick}>
        {icon}
      </div>
    </Tooltip>
  );
};

const Desktop = () => {
  const apps = [
    {
      name: "Tweeter",
      icon: <TwitterIcon style={{ color: "blue" }} className="iconSize" />,
      isMinimized: useState(true),
      toggle: () => {},
    },
    {
      name: "Mail",
      icon: <MailIcon style={{ color: "red" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "Activity Dashboard",
      icon: <AIAppIcon style={{ color: "green" }} className="iconSize" />,
      isMinimized: useState(true),
      toggle: () => {},
    },
    {
      name: "EthCompass",
      icon: (
        <QuestinComponentIcon
          style={{ color: "orange" }}
          className="iconSize"
        />
      ),
      isMinimized: useState(true),
      toggle: () => {},
    },
    {
      name: "Slick Work Chat",
      icon: <ChatIcon style={{ color: "black" }} className="iconSize" />,
      isMinimized: useState(true),
      toggle: () => {},
    },
  ];
 const [isStrike, setStrike] = useState(false)

  apps.forEach((app) => {
    app.toggle = () => app.isMinimized[1](!app.isMinimized[0]);
  });
 
  const strikeHandler = () => {
    setStrike(true);
  };

  return (
    <>
      <div className="statusBar">
        <Clock />
      </div>
      <div className="dock">
        {apps.map((app, index) => (
          <Icon
            key={index}
            icon={app.icon}
            onClick={app.toggle}
            name={app.name}
          />
        ))}
      </div>
      {isStrike ?  <Strike/> : <div></div>}
      <MoneyScore />
      <Chat onMinimize={apps[4].toggle} isMinimized={apps[4].isMinimized[0]} />
      <Tweet onMinimize={apps[0].toggle} isMinimized={apps[0].isMinimized[0]} />
      <Mail onMinimize={apps[1].toggle} isMinimized={apps[1].isMinimized[0]} />
      <AIApp onMinimize={apps[2].toggle} isMinimized={apps[2].isMinimized[0]} />
      <QuestionComponent
        onMinimize={apps[3].toggle}
        isMinimized={apps[3].isMinimized[0]}
        onStrike={strikeHandler}
      />
    </>
  );
};

export default Desktop;
