import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { notificationPop } from "../boilerplate";
import mails from "../data/mailList.js";
import Window from "./Window.js";
import './Mail.css';

let isFirstRender = true;

const MailEntry = ({heading, markdownText, onDelete, sender}) => {
  const [isExpanded, setIsExpanded] = useState(isFirstRender);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
    }
  }, []);

  const previewText = markdownText.split(" ").slice(0, 5).join(" ") + "...";

  const getMarkdownHtml = (markdown) => {
    return { __html: marked(markdown, { sanitize: true }) };
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={isExpanded ? "expanded" : "collapsed"}
      onClick={!isExpanded ? handleClick : undefined}
    >
      <h2 className="sender">{sender}</h2>
      <h2>{heading}</h2>
      {isExpanded ? (
        <div
          className="email"
          dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
        />
      ) : (
        <>
          <button className="delete-btn" onClick={onDelete}>
            &#x1F5D1;
          </button>
          <p>{previewText}</p>
        </>
      )}
      {isExpanded && (
        <>
          <span className="close-btn" onClick={handleClick}>
            &times;
          </span>
        </>
      )}
    </div>
  );
};

const MailBody = ({ isStrike, strikeFile }) => {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("mails")) || mails.level0.always
  );

  useEffect(() => {
    localStorage.setItem("mails", JSON.stringify(data));
  }, [data]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const loadMoreData = (extraData) => {
    extraData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => {
          // Check if the item is already in currentData
          if (
            !currentData.some((existingItem) => existingItem.id === item.id)
          ) {
            notificationPop("./mail.wav");
            return [...currentData, item];
          }
          return currentData;
        });
      }, index * 700); // 1000 milliseconds delay for each item
    });
  };

  const handleMore = (data) => {
    loadMoreData(mails[data.currentLevelId]?.[data.currentDecisionId]);
    loadMoreData(mails[data.currentLevelId]?.always);
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTimeout(() => {
        handleMore(data);
      }, 2000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (isStrike) {
      setData(strikeFile);
    }
  }, [isStrike]);

  return (
    <div className="mailBody">
      {data.toReversed().map((item, index) => (
        <MailEntry
          key={item.id}
          heading={item.heading}
          markdownText={item.markdownText}
          onDelete={() => handleDelete(item.id)}
          sender={item.sender}
        />
      ))}
    </div>
  );
};

const Mail = ({isStrike, strikeFile, onMinimize, isMinimized}) => {
  return (
    <Window
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      content={<MailBody isStrike={isStrike} strikeFile={strikeFile}/>}
      name={"Mail"}
      tag="mail"
      initialSize={{
        width: 700,
        height: 500,
      }}
      initialPosition={{ x: 900, y: 20 }}
    />
  );
};

export default Mail;