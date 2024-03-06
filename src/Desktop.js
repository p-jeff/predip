import React, { useEffect, useState } from "react";
import { ReactComponent as MailIcon } from "bootstrap-icons/icons/envelope-heart-fill.svg";
import { ReactComponent as TwitterIcon } from "bootstrap-icons/icons/sign-intersection-y.svg";
import { ReactComponent as StockComponentIcon } from "bootstrap-icons/icons/bar-chart-line.svg";
import { ReactComponent as QuestinComponentIcon } from "bootstrap-icons/icons/compass.svg";
import { ReactComponent as ChatIcon } from "bootstrap-icons/icons/chat-left-text.svg";
import { ReactComponent as NotesIcon } from "bootstrap-icons/icons/pencil-square.svg";
import { ReactComponent as WatchdogIcon } from "bootstrap-icons/icons/eye-fill.svg";
import "./styling/Desktop.css";
import Mail from "./proper/Mail";
import Tweeter from "./proper/Tweeter";
import StockComponent from "./StockComponent";
import Clock from "./Clock";
import QuestionComponent from "./QuestionComponent";
import Chat from "./Chat";
import Strike from "./Strike";
import StrikeCounter from "./StrikeCounter";
import axios from "axios";
import { FadingImage } from "./boilerplate";  
import Notes from "./proper/Notes";
import EthicsDash from "./proper/EthicsDash";

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
      name: "Y Message Board",
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
      name: "Stocks",
      icon: (
        <StockComponentIcon style={{ color: "green" }} className="iconSize" />
      ),
      isMinimized: useState(false),
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
    {
      name: "Notes",
      icon: <NotesIcon style={{ color: "brown" }} className="iconSize" />,
      isMinimized: useState(false),
      toggle: () => {},
    },
    {
      name: "DCP Watchdog",
      icon: <WatchdogIcon style={{ color: "brown" }} className="iconSize" />,
      isMinimized: useState(true),
      toggle: () => {},
    },
  ];
  const [strikes, setStrikes] = useState(0);
  const [isStrike, setIsStrike] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [dailyTasksCompleted, setDailyTasksCompleted] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  apps.forEach((app) => {
    app.toggle = () => app.isMinimized[1](!app.isMinimized[0]);
  });

  const strikeHandler = () => {
    setStrikes((prevStrikes) => {
      const newStrikes = prevStrikes + 1;
      if (newStrikes === 2) {
        if (!apps[6].isMinimized[0]) apps[6].toggle();
        setIsStrike(true);
      }
      return newStrikes;
    });
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvent(data);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/reset")
      .then(() => {
        // API call sent without waiting for response
        console.log("API call sent");
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  return (
    <>
      {showIntro ? <FadingImage /> : null}

      <StrikeCounter strikes={strikes} />
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
      {isStrike ? <Strike /> : <div></div>}
      <Chat onMinimize={apps[4].toggle} isMinimized={apps[4].isMinimized[0]} />
      <Tweeter onMinimize={apps[0].toggle} isMinimized={apps[0].isMinimized[0]} />
      <Mail
        onMinimize={apps[1].toggle}
        isMinimized={apps[1].isMinimized[0]}
        position={{ x: 900, y: 20 }}
      />
      <StockComponent onMinimize={apps[2].toggle} isMinimized={apps[2].isMinimized[0]} event={event} />
      <QuestionComponent
        onMinimize={apps[3].toggle}
        isMinimized={apps[3].isMinimized[0]}
        onStrike={strikeHandler}
        dailyTasksCompleted={dailyTasksCompleted}
      />
      <Notes
        onMinimize={apps[5].toggle}
        isMinimized={apps[5].isMinimized[0]}
        dailyTasksCompleted={setDailyTasksCompleted}
      />
    </>
  );
};

export default Desktop;
